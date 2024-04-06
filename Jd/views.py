from django.shortcuts import render, redirect
from .forms import LoginForm, RegisterForm, ProveIdentityForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .models import User, Notification, PwdReset, Item
from .utils import Formats, States, EmailNotification, Generators, PasswordValidator
from uuid import uuid4
from django.conf import settings

nofify = EmailNotification()
gen = Generators()
pwd_validator = PasswordValidator()
formats = Formats()
state = States()


# registration
def register(request):
    """
    registration
    """
    if request.user.is_authenticated:
        messages.info(request, f"You Are Already Signed In")
        return redirect('shop')

    if request.method == "POST":
        form = RegisterForm(request.POST)
        
        if form.is_valid():
            new_user = form.save()

            # sending notification and an email
            nofify.send_all(user=new_user, to=new_user.email, subject=settings.WELCOME_TITLE, message=settings.WELCOME_MESSAGE)

            messages.success(request, f"Hello {new_user} Your Account was Successfully Created. You can now Log In")            
            return redirect('login')
        else:
            context = {"form": form, "errors": form.errors}
            messages.error(request, f"Please correct these errors")
            return render(request, "Jd/register.html", context)
    else:
        form = RegisterForm()
        context = {"form": form}
        return render(request, "Jd/register.html", context)


def login_page(request):
    """
    login
    """
    if request.user.is_authenticated:
        messages.info(request, f"You Are Already Signed In")
        return redirect('shop')
    
    if request.method == "POST":
        user = None
        email = request.POST.get("email").lower()
        password = request.POST.get('password')

        try:
            user = User.objects.get(email=email)
            if user.is_active is False:
                messages.error(request, f'lnvalid email or password')
                return redirect('login')
        except Exception:
            messages.error(request, f'Invalid email or password')
            return redirect('login')
        
        user = authenticate(request, email=email, password=password)

        if user:
            login(request, user)
            messages.success(request, f"Welcome Back {user.username}")
            response = redirect('shop')
            response.set_cookie("prove", str(uuid4()), max_age=(60 * settings.PROVE_TIME))
            return response
        else:
            messages.error(request, 'Invalid email or password.')
            return redirect('login')            
    else:
        form = LoginForm()
        context = {"form": form}
        return render(request, "Jd/login.html", context)

@login_required(login_url='login')
def logout_page(request):
    """
    Logout
    """
    logout(request)

    response = redirect('login')
    response.delete_cookie("prove")
    return response

@login_required(login_url='login')
def prove_identity(request):
    """
    Prove idetity to modify account
    """
    prove = request.COOKIES.get("prove")
    if prove:
        return redirect(str(state.page))
    
    if request.method == "POST":
        user = request.user
        password = request.POST.get('password')        
        user = authenticate(request, email=user.email, password=password)

        if user:
            messages.success(request, f"Access Granted")
            response = redirect(str(state.page))
            response.set_cookie("prove", str(uuid4()), max_age=(60 * settings.PROVE_TIME))
            return response
        else:
            messages.error(request, 'Invalid password')
            return redirect('prove_identity')            

    form = ProveIdentityForm()
    context = {"form": form}
    return render(request, "Jd/prove_identity.html", context)


@login_required(login_url='login')
def account(request):
    """
    Account page
    """
    user = request.user
    context = {
        "user": user, 
        "email": formats.email(user.email),
        "phone": formats.phone_number(user.phone_number),        
        }

    return render(request, "Jd/account.html", context)


@login_required(login_url='login')
def manage_account(request):
    """
    Manage Account page
    """
    prove = request.COOKIES.get("prove")
    if prove and (state.page == "manage_account"):
        user = request.user
        context = {
            "user": user,
            "email": formats.email(user.email),
            "phone": formats.phone_number(user.phone_number),        
            }
        return render(request, "Jd/manage_account.html", context)
    else:
        state.page = "manage_account"
        return redirect("prove_identity")
   
   
@login_required(login_url='login')
def edit_account(request, table):
    """
    Editing Account page
    """
    prove = request.COOKIES.get("prove")
    if not prove:
        state.page = "manage_account"
        messages.error(request, "Time Out!")
        return redirect("prove_identity") 
    
    user = request.user
    if request.method == "POST":
        data = request.POST.dict()
        status, msg = user.update(data)
        
        if (status is True) and ( ("password" in msg.lower()) or ("delete" in msg.lower()) ):
            messages.success(request, msg)
            return redirect("logout")
        
        if (status is False):
            context = {"table": table}
            messages.error(request, msg)
            return render(request, "Jd/edit_account.html", context)
        
        if (status is True):
            messages.success(request, msg)
            return redirect('manage_account')
        
        messages.info(request, msg)
        return redirect('manage_account')
    else:
        context = {"table": table, "delete_keyword": settings.DELETE_KEYWORD}
        return render(request, "Jd/edit_account.html", context)

@login_required(login_url='login')
def account_notification(request):
    """notification page"""
    user = request.user
    try:
        notifications = Notification.objects.filter(user=user)
    except Exception:
        notifications = None

    context = {
        "user": user, 
        "email": formats.email(user.email),
        "phone": formats.phone_number(user.phone_number),        
        "notifications": notifications,
        }

    return render(request, "Jd/account_notification.html", context)


def fogot_pwd(request):
    """
    Forgot password
    """
    context = {}

    if request.method == "POST":
        email = request.POST.get("email").lower()

        try:
            user = User.objects.get(email=email)
            # additional security if posible
            try:
                reset = PwdReset.objects.filter(user=user).order_by('-date')
                reset = reset[0]

                if reset.is_valid():
                    messages.info(request, "We already sent an email. If you havent received it please wait for a few minutes and try again")
                    return render(request, "Jd/reset_pwd_confirmation.html", context)                
            except Exception as e:
                pass
            link = gen.pwd_reset_link(user)

            # sending both notification and email
            subject = settings.PWD_RESET_LINK_TITLE
            message = f"{settings.PWD_RESET_LINK_MESSAGE}\n{link}"
            nofify.send_all(user=user, to=user.email, subject=subject, message=message)

            messages.success(request, f"An email will be sent to '{email}', Please check your email inbox or spam")
            return render(request, "Jd/reset_pwd_confirmation.html", context)
        except Exception as e:
            user = None
            messages.error(request, "Invalid email.")
        return render(request, "Jd/foget_pwd.html", context)

    return render(request, "Jd/foget_pwd.html", context)

def reset_pwd(request, id):
    """
    reset password
    """
    context = {}

    try:
        reset = PwdReset.objects.get(id=id)
        if reset.is_valid():
            if request.method == "POST":
                pwd1 = request.POST.get("password1")
                pwd2 = request.POST.get("password2")
                st, pwd = pwd_validator.validate(pwd1=pwd1, pwd2=pwd2)

                if st is False:                    
                    messages.error(request, pwd)
                    messages.info(request, "Eg: '@Abcd123'")
                    return render(request, "Jd/reset_pwd.html", context)
                
                user = reset.user
                user.set_password(pwd)
                user.save()                

                subject = settings.PWD_RESET_CONFIRM_TITLE
                message = settings.PWD_RESET_CONFIRM_MESSAGE
                nofify.send_all(user=user, to=user.email, subject=subject, message=message)

                messages.success(request, "Your password was reset successfully")
                context["reset"] = True
                return render(request, "Jd/reset_pwd_confirmation.html", context)
        else:
            messages.error(request, "Opps the reset link is either expired or Invalid")
            context["reset"] = False
            return render(request, "Jd/reset_pwd_confirmation.html", context)        
    except Exception:
        messages.error(request, "Opps the reset link is either expired or Invalid")
        context["reset"] = False
        return render(request, "Jd/reset_pwd_confirmation.html", context)
    return render(request, "Jd/reset_pwd.html", context)


def about(request):
    """About Us Page"""
    context = {
        "location": settings.SHOP_PHYSICAL_LOCATION,
        "phone": settings.SHOP_PHONE_NUMBER,
        "whatsppp_phone": settings.SHOP_WHATSAPP_PHONE_NUMBER,
        "email": settings.SHOP_EMAIL,
        "about_us": settings.MORE_ABOUT_US,
    }
    return render(request, "Jd/about.html", context)


def contact(request):
    """Contact Us Page"""
    context = {
        "location": settings.SHOP_PHYSICAL_LOCATION,
        "phone": settings.SHOP_PHONE_NUMBER,
        "whatsppp_phone": settings.SHOP_WHATSAPP_PHONE_NUMBER,
        "email": settings.SHOP_EMAIL,
        "about_us": settings.MORE_ABOUT_US,
    }
    return render(request, "Jd/contact.html", context)


def home(request):
    """home page"""
    context = {}
    return render(request, "Jd/home.html", context)


def shop(request):
    """shop page"""
    items = Item.objects.all()

    for item in items:
        item.description = formats.item_description(item.description)
        item.price = formats.item_price(item.price)
        
    context = {"items": items}
    return render(request, "Jd/shop.html", context)


def categories(request):
    """all categories"""
    context = {}
    return render(request, "Jd/category.html", context)


def item(request, id):
    """item page"""
    item = Item.objects.get(id=id)

    item.full_description = item.description
    item.description = formats.item_description(item.description)
    item.price = formats.item_price(item.price)

    context = {"item": item}
    return render(request, "Jd/item.html", context)
