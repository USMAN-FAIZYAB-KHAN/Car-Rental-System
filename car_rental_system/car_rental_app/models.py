from django.db import models

# Create your models here.
class Car(models.Model):
    car_id = models.AutoField(primary_key=True)
    car_name = models.CharField(max_length=50)
    car_type = models.CharField(max_length=50)
    car_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return self.car_name