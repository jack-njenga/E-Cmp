# Generated by Django 4.2.11 on 2024-04-04 14:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Jd', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='description',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='item',
            name='name',
            field=models.TextField(),
        ),
    ]
