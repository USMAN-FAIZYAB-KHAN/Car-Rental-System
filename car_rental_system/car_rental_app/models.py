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
    
class UserType(models.Model):
    type_id = models.AutoField(primary_key=True)
    type_name = models.CharField(max_length=20)

    def __str__(self):
        return self.type_name
    

class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    seating_capacity = models.IntegerField()
    description = models.TextField()

    def __str__(self):
        return self.name
    
class Transmission(models.Model):
    transmission_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField(null=True)

    def __str__(self):
        return self.name
    
class Model(models.Model):
    model_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    manufacturer = models.CharField(max_length=50)
    transmission = models.ForeignKey(Transmission, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class Car(models.Model):
    car_id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete= models.SET_NULL, null=True)
    model = models.ForeignKey(Model, on_delete=models.SET_NULL, null=True)
    year = models.IntegerField()
    color = models.CharField(max_length=10)
    price_per_day = models.FloatField()
    license_number = models.CharField(max_length=15)
    availability = models.BooleanField()

    def __str__(self):
        return self.license_number
    

class RentalStatus(models.Model):
    status_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField(null=True)

    def __str__(self):
        return self.name


class Rental(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    car = models.ForeignKey(Car, on_delete=models.SET_NULL, null=True)
    booking_date = models.DateField()
    pickup_date = models.DateField()
    drop_date = models.DateField()
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.ForeignKey(RentalStatus, on_delete=models.SET_NULL, null=True)

    class Meta:
            unique_together = ('user', 'pickup_date')

class Payment(models.Model):
    rental = models.ForeignKey(Rental, on_delete=models.SET_NULL, null=True)
    payment_number = models.IntegerField()
    payment_method = models.CharField(max_length=50)
    payment_date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    


class Review(models.Model):
    rental = models.ForeignKey(Rental, on_delete=models.SET_NULL, null=True)
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    reviewe_date = models.DateField()
    comment = models.TextField()
