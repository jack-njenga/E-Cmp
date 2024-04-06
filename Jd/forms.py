from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

from .models import User
from datetime import date, timedelta


class LoginForm(forms.ModelForm):
    """ login form """

    email_widget = forms.EmailInput(attrs={"placeholder": "Email"})
    password_widget = forms.PasswordInput(attrs={"placeholder": "Password"})
  
    email       = forms.EmailField(widget=email_widget)
    password    = forms.CharField(widget=password_widget)

    class Meta:
        model = User
        fields = ["email", "password"]


class RegisterForm(UserCreationForm):
    """ user form """
    
    first_name_widget = forms.TextInput(attrs={"placeholder": "First Name"})
    last_name_widget = forms.TextInput(attrs={"placeholder": "Last Name"})
    phone_number_widget = forms.NumberInput(attrs={"placeholder": "Phone Number"})
    email_widget = forms.EmailInput(attrs={"placeholder": "Email"})
    username_widget = forms.TextInput(attrs={"placeholder": "Username"})
    password1_widget = forms.PasswordInput(attrs={"placeholder": "Password"})
    password2_widget = forms.PasswordInput(attrs={"placeholder": "Confirm Password"})
    
    
    # first_name  = forms.CharField(widget=first_name_widget)
    # last_name  = forms.CharField(widget=last_name_widget)
    # phone_number  = forms.CharField(widget=phone_number_widget)
    email       = forms.EmailField(widget=email_widget)
    username    = forms.CharField(widget=username_widget)
    password1   = forms.CharField(widget=password1_widget)
    password2   = forms.CharField(widget=password2_widget)
    
    class Meta:
        model = User
        fields = ["email", "username", "password1", "password2"]

    def clean_email(self):
        email = self.cleaned_data["email"].lower()
        try:
            user = User.objects.get(email=email)
        except Exception:
            return email
        raise forms.ValidationError(f"Email {email} is Already registered. Try Another one.")


    def clean_username(self):
        username = self.cleaned_data["username"]
        try:
            user = User.objects.get(username=username)
        except Exception:
            return username
        return username
        # raise forms.ValidationError(f"Username {username} is Already Taken. Try Another one.")



class ProveIdentityForm(forms.ModelForm):
    """ prove idenity form """
    password_widget = forms.PasswordInput(attrs={"placeholder": "Password"})
    password    = forms.CharField(widget=password_widget)

    class Meta:
        model = User
        fields = ["password"]
