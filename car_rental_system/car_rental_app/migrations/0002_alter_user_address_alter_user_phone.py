# Generated by Django 5.0.6 on 2024-06-26 05:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('car_rental_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='address',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone',
            field=models.CharField(blank=True, max_length=15),
        ),
    ]
