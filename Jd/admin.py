from django.contrib import admin
from .models import Notification, PwdReset, Item
# Register your models here.

admin.site.register(Notification)
admin.site.register(PwdReset)
admin.site.register(Item)
