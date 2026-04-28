from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Client(models.Model):
    name = models.CharField(max_length=20)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    status_choices = (
    (1, "lead"),
    (2, "active"),
    (3, "archived"),)
    status = models.CharField(max_length=9,
                  choices=status_choices,
                  default=2)
    username = models.ForeignKey(User, on_delete=models.CASCADE, related_name="clients")
    
    def __str__(self):
        return self.name