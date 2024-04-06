from django.conf import settings
import threading, locale


max_description_length = 72


class Formats:
    def email(self, email: str) -> str:
        """
        email format
        """
        username, domain = email.split('@')
        mail = f"{username[0]}...{username[-2:]}@{domain}"
        return mail
    
    def phone_number(self, phone):
        phone = str(phone)
        no = f"{phone[:2]}...{phone[-2:]}"
        return no
    
    def register_data(self, formfields={}, data={}):
        """ to be completed"""
        if type(formfields) is dict:
            new_data = {}
            required_fields = formfields.keys()
            for key, val in data.items():
                key = key.lower()
                if key in required_fields:
                    print(f"{key}: {val}")

                    if "username" in key:
                        if (val is False) or (val is None) or (len(val) < 2):
                            val = data["first_name"]

                    if "email" in key:
                        if (val is False) or (val is None) or (len(val) < 2):
                            val = None
                new_data[key] = val

            return new_data
        else:
            return False, "formfields should be a dictionary"
        
    def item_description(self, desc):
        """..."""        
        if len(desc) > max_description_length:
            desc = f"{desc[:max_description_length]}..."

        return desc
    
    def item_price(self, price, currency=settings.CURRENCY):
        """Price format from 1900 to Ksh 1, 900"""
        price = int(price)

        locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')
        price = locale.currency(price, grouping=True).lower()
        
        price = f"{currency} {price.split('$')[-1]}"
    
        return price


        return price


    
class States:
    prove = False
    page = "manage_account"


class EmailValidator:
    """to be update soon"""

    def validate(self, email):
        from django.core.validators import validate_email
        from django.core.exceptions import ValidationError

        try:
            validate_email(email)
            return True, email
        except ValidationError as vale:
            return False, f"{vale}"
        
    def email_exists(self, email):
        """
        check if an email exists and can receive mails
        this method is slow  and should not be used
        """
        # from validate_email import validate_email

        # is_valid = validate_email(email)
        # if is_valid:
        #     return True, email
        # return False, "Email is not valid."
        pass
        

class PhoneNumberValidator:
    """phone number validator"""

    phone_len = 10
    first_digit = '0'
    second_digits = ['7', '1']

    def validate(self, phone):
        phone = str(phone)
        all_digits = any(not char.isdigit() for char in phone) # checks if we have any letters in the phone number

        if all_digits:
            return False, "Phone number is not valid"
        if (len(phone) != self.phone_len) or (phone[0] != self.first_digit):
            return False, "Phone number is not valid"
        
        if (phone[1] not in self.second_digits):
            return False, "Phone number is not valid"
        
        return True, phone




class PasswordValidator:

    default_length = 8
    lc_len = 1          # required default lowercase count 
    uc_len = 1          # required default uppercase count 
    no_len = 1          # required default number count
    sy_len = 1          # required default symbols count

    def __init__(self, *args, **kwargs):
        """init"""
        self.password1 = kwargs.get("password1")
        self.password2 = kwargs.get("password2")

    def validateLength(self, pwd, length=default_length):
        if len(pwd) >= length:
            return True, pwd
        else:
            return False, "The password is too short. It must contain at least 8 characters."


    def validateUppercase(self, pwd, uc_len=uc_len):
        if sum(1 for char in pwd if char.isupper()) < uc_len:
            return False, f"The password must contain at least {uc_len} uppercase letter(s)."
        return True, pwd
    

    def validateLowercase(self, pwd, lc_len=lc_len):
        if sum(1 for char in pwd if char.islower()) < lc_len:
            return False, f"The password must contain at least {lc_len} lowercase letter(s)."
        return True, pwd
    

    def validateNumber(self, pwd, no_len=no_len):
        if sum(1 for char in pwd if char.isdigit()) < no_len:
            return False, f"The password must contain at least {no_len} number(s)."
        return True, pwd
    

    def validateSymbol(self, pwd, sy_len=sy_len):
        if sum(1 for char in pwd if char in "!@#$%^&*()_+=-[]{};:'\"|\\,.<>?/~") < sy_len:
            return False, f"The password must contain at least {sy_len} symbol(s)."
        return True, pwd

     
    def validate(self, pwd1, pwd2=None):
        if pwd2:
            if pwd1 == pwd2:
                pass
            else:
                return False, "Passwords does not match"
        for func in [self.validateLength, self.validateLowercase, self.validateUppercase, self.validateNumber, self.validateSymbol]:
            state, pwd = func(pwd1)
            if state is False:
                return state, pwd
        return state, pwd1


class EmailNotification:
    """
    Email notifications
    """

    def send_notification(self, user=None, frm=None, to=None, subject=None, message=None):
        """
        saves a notification of a user on account
        """
        from .models import Notification

        if not user:
            return False, "No user provided"
        if not message:
            return False, "No message provided"
        if not frm:
            frm = settings.EMAIL_HOST_USER
        if not subject:
            subject = settings.DEFAULT_EMAIL_SUBJECT  
        if type(user) is str:
            return False, "User should be an Object not a string"

        data = {
            "user": user,
            "email_to": to,
            "email_from": frm,
            "subject": subject,
            "message": message
         }
        
        noti = Notification(**data)
        threading.Thread(target=noti.save).start()
        # noti.save()

        return True, noti
    

    def send_email_helper(self, **kwargs):
        """
        sands an email
        """
        from django.core.mail import send_mail
        user = kwargs.get("user")
        frm = kwargs.get("frm")
        to = kwargs.get("to")
        subject = kwargs.get("subject")
        message = kwargs.get("message")

        if not to:
            return False, "No recipient email provided"
        if not message:
            return False, "No message provided"
        if not frm:
            frm = settings.EMAIL_HOST_USER
        if not subject:
            subject = settings.DEFAULT_EMAIL_SUBJECT 
        
        sent = send_mail(
            subject=subject,
            message=message,
            from_email=frm,
            recipient_list=[to],
        )

        print(f"{'='*10} Email Sent({sent}) {'='*10} \nFrom: {frm}\nTo: {to}({user})\nSubject: {subject}\nMessage: {message}")
        return True, f"An email will be sent to {to}, Please check your email"
    
    def send_email(self, user=None, frm=None, to=None, subject=None, message=None):
        """
        sands an email
        """
        kwargs = {
            "user": user,
            "frm": frm,
            "to": to,
            "subject": subject,
            "message": message
        }
        
        threading.Thread(target=self.send_email_helper, kwargs=kwargs).start()
        
        return True, f"An email will be sent to {kwargs.get('to')}, Please check your email"        


    def send_all(self, user=None, frm=None, to=None, subject=None, message=None):
        """
        sends to both email and account
        """
        self.send_email(user=user, frm=frm, to=to, subject=subject, message=message)
        self.send_notification(user=user, frm=frm, to=to, subject=subject, message=message)

        return True, f"An email will be sent to {to}, Please check your email inbox or spam."
        
class Generators:

    def pwd_reset_link(self, user):
        from .models import PwdReset        

        data = {"user": user}
        reset = PwdReset(**data)
        reset.save()
        link = f"http://192.168.100.70:8000/reset_password/{reset.id}"

        return link