from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 


class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=20)
    lastname = models.CharField(max_length=20)
    email = models.EmailField(max_length=50)
    password = models.CharField(max_length=20)  # error message
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=15)
    user_type = models.CharField(max_length=10, choices=[('Customer', 'customer'), ('Admin', 'admin')]) 

    def __str__(self):
        return self.firstname + ' ' + self.lastname

class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    seating_capacity = models.IntegerField()
    description = models.TextField()


class Car(models.Model):
    category = models.ForeignKey(Category, on_delete= models.SET_NULL, null=True)
    car_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=10)
    transmission_type = models.CharField(max_length=10, choices=[('Manual', 'Manual'),('Automatic', 'Automatic')])
    price_per_day = models.FloatField()
    license_number = models.CharField(max_length=15)
    modal = models.IntegerField()

    def __str__(self):
        return self.car_name

class Rental(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    car = models.ForeignKey(Car, on_delete=models.SET_NULL, null=True)
    rental_id = models.AutoField(primary_key=True)
    booking_date = models.DateField()
    pickup_date = models.DateField()
    drop_date = models.DateField()
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=[('Completed', 'Completed'), ('Approved', 'Approved'), ('Ongoing', 'Ongoing')])

class Payment(models.Model):
    rental = models.ForeignKey(Rental, on_delete=models.SET_NULL, null=True)
    payment_number = models.IntegerField()
    payment_menthod = models.CharField(max_length=50)
    payment_date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)


class Review(models.Model):
    rental = models.ForeignKey(Rental, on_delete=models.SET_NULL, null=True)
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    reviewe_date = models.DateField()
    comment = models.TextField()
