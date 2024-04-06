
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings
from uuid import uuid4
from django.shortcuts import redirect
from Jd.utils import PasswordValidator, EmailValidator, PhoneNumberValidator, EmailNotification

notify = EmailNotification()
pwdvalidator = PasswordValidator()
emailval = EmailValidator()
phone_validator = PhoneNumberValidator()


class MyAccountManager(BaseUserManager):
    """
    Custom Account Manager
    """
    def create_user(self, first_name, last_name, phone_number, email=None, username=None, password=None):
        if not first_name:
            raise ValueError(f"Email is required")
        if not last_name:
            raise ValueError(f"Lastname is required")
        if not phone_number:
            raise ValueError(f"Phone Number is required")
        user = self.model(
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            email=self.normalize_email(email),
            username=username,
        )
        user.set_password(password)
        user.save(using=self._db)
        
        return user
    
    def create_staff(self, first_name, last_name, phone_number, email=None, username=None, password=None):
        """ Staff Only """
        user = self.create_user(
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            email=email, 
            username=username,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True

        user.save(using=self._db)

        return user


    def create_superuser(self, first_name, last_name, phone_number, email=None, username=None, password=None):
        """ Super User Creation"""
        user = self.create_user(
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            email=email, 
            username=username,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True

        user.save(using=self._db)

        return user
    
    

def get_profile_image_filepath(self, filename):
    return f"profile_images/{str(self.pk)}/profile_image.png"

def get_default_profile_image():
    return "../../static/images/default_profile_image.png"


class User(AbstractBaseUser):
    """
    Custum User model
    """
    is_superuser    = models.BooleanField(default=False)
    is_admin        = models.BooleanField(default=False)
    is_staff        = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=True)

    date_joined     = models.DateTimeField(verbose_name="date joined", auto_now_add=True)
    last_login      = models.DateTimeField(verbose_name="last login", auto_now=True)
    profile_image   = models.ImageField(max_length=255, upload_to=get_default_profile_image, null=True, blank=True, default=get_default_profile_image)
    
    id              = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    first_name      = models.CharField(verbose_name="first name", max_length=30, default="", null=True, blank=True)
    last_name       = models.CharField(verbose_name="last name", max_length=30, default="", null=True, blank=True)
    phone_number    = models.CharField(verbose_name="phone number", max_length=70, unique=True, null=True, blank=True)
    email           = models.EmailField(max_length=70, unique=True, null=True, blank=True)
    username        = models.CharField(max_length=60, null=True, blank=True)
    
    objects = MyAccountManager()
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "username", "phone_number"]    

    def __str__(self):
        if self.username:
            return str(self.username)
        return str(self.first_name)
    
    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True
    
    def get_profile_image_filename(self):
        return ""

    def to_dict(self):
        user_dict = {
            "id": self.id,
            "name": self.username,
            "email": self.email,
        }
        return user_dict
    
    def update(self, items: dict):
        """updates the user data"""
        name_update, msg = False, ""

        for key, val in items.items():
            key = key.lower()
            if ("csrf" in key) and ("token" in key):
                pass
                continue

            if key == "password":                
                state, pwd = pwdvalidator.validate(val)
                if state is True:
                    self.set_password(val)
                    self.save()

                    sub = settings.PASSWORD_CHANGE_TITLE
                    note = settings.PASSWORD_CHANGE_MESSAGE
                    notify.send_all(user=self, to=self.email, subject=sub, message=note)

                    return True, "Password Updated Succesfully"
                return state, pwd
            
            elif key == "email":
                st, ms = emailval.validate(email=val)
                if st:
                    try:
                        status, user = self_check(method="get", by="email", value=val.lower())
                        return False, "The email is already registered. Try another one."
                    except Exception as e:
                        setattr(self, key, val.lower())
                        self.save()

                        sub = settings.EMAIL_CHANGE_TITLE
                        note = settings.EMAIL_CHANGE_MESSAGE
                        notify.send_all(user=self, to=self.email, subject=sub, message=note)

                        return True, "Email Updated Succesfully"
                return st, ms
                    
            elif key == "phone_number":
                st, ms = phone_validator.validate(val)
                if not st:
                    return st, ms
                try:
                    status, user = self_check(method="get", by="phone_number", value=val.lower())
                    return False, "Phone Number is already registered. Try another one."
                except Exception as e:
                    setattr(self, key, val)
                    self.save()

                    sub = settings.PHONE_CHANGE_TITLE
                    note = settings.PHONE_CHANGE_MESSAGE
                    notify.send_all(user=self, to=self.email, subject=sub, message=note)

                    return True, "Phone Number Updated Succesfully"
            elif key == "delete":
                delete_keyword = settings.DELETE_KEYWORD
                
                if val == delete_keyword:
                    self.is_active = False
                    email = self.email
                    self.email = f"deleted.{self.id}.{email}"
                    self.phone_number = f"deleted.{self.id}.{self.phone_number}"
                    self.save()

                    sub = settings.DELETE_ACC_TITLE
                    note = settings.DELETE_ACC_MESSAGE
                    notify.send_all(user=self, to=email, subject=sub, message=note)

                    return True, "Deleted Succesfully Deactivated"
                return False, f"Delete key words does not match to '{delete_keyword}'"
            
            elif key == "username":
                setattr(self, key, val)
                self.save()
                msg = f"{msg}\nUsername updated Succesfully."
                name_update = True
            elif key == "first_name":
                setattr(self, key, val)
                self.save()
                msg = f"{msg}\nFirst Name updated Succesfully."
                name_update = True
            elif key == "last_name":
                setattr(self, key, val)
                self.save()
                msg = f"{msg}\nLast Name updated Succesfully."
                name_update = True
            else:
                return False, f"Invalid No such table as {key}"
        if (name_update is True) and msg:
            sub = settings.NAME_CHANGE_TITLE
            note = f"{settings.NAME_CHANGE_MESSAGE}"
            notify.send_all(user=self, to=self.email, subject=sub, message=note)

            return True, msg

def self_check(method="get", by="email", value=""):
    if method == "get":
        if by == "email":
            user = User.objects.get(email=value.lower())
            if user:
                return True, user
            return False, None
        elif by == "phone_number":
            user = User.objects.get(phone_number=value.lower())
            if user:
                return True, user
            return False, None

    