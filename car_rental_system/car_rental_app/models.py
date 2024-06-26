from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 
from django.contrib.auth.models import AbstractUser
from .manager import UserManager

class UserType(models.Model):
    type_id = models.AutoField(primary_key=True)
    type_name = models.CharField(max_length=20)

    def __str__(self):
        return self.type_name

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    address = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    user_type = models.ForeignKey(UserType, on_delete=models.SET_NULL, null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.firstname + ' ' + self.lastname
    
    
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
    
class CarModel(models.Model):
    model_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    manufacturer = models.CharField(max_length=50)
    transmission = models.ForeignKey(Transmission, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class Car(models.Model):
    car_id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete= models.SET_NULL, null=True)
    model = models.ForeignKey(CarModel, on_delete=models.SET_NULL, null=True)
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
            unique_together = ('car', 'pickup_date')

    def __str__(self):
        return f"Car: {self.car.license_number}, Pickup Date: {self.pickup_date}"



class Payment(models.Model):
    rental = models.ForeignKey(Rental, on_delete=models.CASCADE)
    payment_type = models.CharField(max_length=50)
    payment_method = models.CharField(max_length=50)
    payment_date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Rental: {self.rental.car.license_number}, Payment Date: {self.payment_date}"
    

class Review(models.Model):
    rental = models.OneToOneField(Rental, on_delete=models.CASCADE)
    # one to one relationship with rental table, so that a review can be given only once for a rental
    # it is like a foreign key, but with unique constraint
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    review_date = models.DateField()
    comment = models.TextField()

    def __str__(self):
        return f"Rental: {self.rental.car.license_number}, Rating: {self.rating}"