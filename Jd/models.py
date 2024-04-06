from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from uuid import uuid4
# import os
from Account.models import User
from django.utils import timezone
from datetime import datetime, timedelta

def get_item_image_path():
    path = settings.ITEM_IMAGE_PATH

    # print(f"{'='*40} : {path}")
    # if not os.path.exists(path):
    #     os.makedirs(path)

    return path

def get_item_image(instance, filename):
    return settings.DEFAULT_ITEM_IMAGE

# notification table
class Notification(models.Model):
    """
    notification table
    """
    id          = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    date        = models.DateTimeField(auto_now_add=True)
    is_deleted  = models.BooleanField(default=False)

    user        = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    email_to    = models.TextField(null=True, blank=True)
    email_from  = models.TextField(default=settings.EMAIL_HOST_USER, null=True, blank=True)
    subject     = models.TextField(null=True, blank=True)
    message     = models.TextField(null=True, blank=True)
    

    class Meta:
        ordering = ["-date"]

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        email_to = kwargs.pop('email_to', None)
        email_from = kwargs.pop('email_from', settings.EMAIL_HOST_USER)
        subject = kwargs.pop('subject', None)
        message = kwargs.pop('message', None)
        
        super().__init__(*args, **kwargs)

        if user:
            self.user = user
        if email_to:
            self.email_to = email_to
        if email_from:
            self.email_from = email_from
        if subject:
            self.subject = subject
        if message:
            self.message = message

    def __str__(self) -> str:
        msg = f"Notification from {self.email_from} to {self.email_to} about ({self.subject})"
        return msg


class PwdReset(models.Model):
    """
    this is the password reset table
    """
    id          = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    date        = models.DateTimeField(auto_now_add=True)
    is_deleted  = models.BooleanField(default=False)

    user        = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        ordering = ["-date"]

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        
        super().__init__(*args, **kwargs)

        if user:
            self.user = user

    def __str__(self) -> str:
        return f"{self.id}"
    
    def is_valid(self):
        """
        checks if a reset link is expired or valid based on time 
        eg for 30 minutes
        """
        curr_time = timezone.now()
        reset_time = self.date
        life = (curr_time - reset_time)

        limit = timedelta(minutes=settings.PWD_RESET_LINK_EXPIRY)

        if (life > limit):
            return False
        return True


class Item(models.Model):
    """
    Item table
    """
    id              = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    created         = models.DateTimeField(auto_now_add=True, editable=False)
    updated         = models.DateTimeField(auto_now=True)
    is_deleted      = models.BooleanField(default=False)

    image           = models.ImageField(max_length=255, upload_to=settings.ITEM_IMAGE_PATH)
    image1          = models.ImageField(max_length=255, upload_to=settings.ITEM_IMAGE_PATH, null=True, blank=True)   
    image2          = models.ImageField(max_length=255, upload_to=settings.ITEM_IMAGE_PATH, null=True, blank=True)
    image3          = models.ImageField(max_length=255, upload_to=settings.ITEM_IMAGE_PATH, null=True, blank=True)
    image4          = models.ImageField(max_length=255, upload_to=settings.ITEM_IMAGE_PATH, null=True, blank=True)
    
    name            = models.TextField()
    description     = models.TextField()    
    price           = models.IntegerField()
    price_before    = models.IntegerField()

    category        = models.JSONField(null=True, blank=True)
    brand           = models.TextField(null=True, blank=True) 
    model           = models.TextField(null=True, blank=True) 
    other           = models.JSONField(null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.id}"


