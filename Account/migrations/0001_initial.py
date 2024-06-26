# Generated by Django 4.2.11 on 2024-04-04 14:21

import Account.models
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
                ('last_login', models.DateTimeField(auto_now=True, verbose_name='last login')),
                ('profile_image', models.ImageField(blank=True, default=Account.models.get_default_profile_image, max_length=255, null=True, upload_to=Account.models.get_default_profile_image)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('first_name', models.CharField(blank=True, default='', max_length=30, null=True, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, default='', max_length=30, null=True, verbose_name='last name')),
                ('phone_number', models.CharField(blank=True, max_length=70, null=True, unique=True, verbose_name='phone number')),
                ('email', models.EmailField(blank=True, max_length=70, null=True, unique=True)),
                ('username', models.CharField(blank=True, max_length=60, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
