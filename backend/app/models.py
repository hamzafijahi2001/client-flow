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
    status = models.IntegerField(
                  choices=status_choices,
                  default=2)
    username = models.ForeignKey(User, on_delete=models.CASCADE, related_name="clients")
    
    def __str__(self):
        return self.name
    
class Project(models.Model):
    title = models.CharField(max_length=20)
    description = models.TextField()
    deadline = models.DateTimeField()
    status_choices = (
    (1, "planning"),
    (2, "active"),
    (3, "done"),)
    status = models.IntegerField(
                  choices=status_choices,
                  default=2)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="projects")
    
    def __str__(self):
        return self.title
    
class Task(models.Model):
    title = models.CharField(max_length=20)
    description = models.TextField()
    deadline = models.DateField()
    priority_choices = (
    (1, "Must Have"),
    (2, "Should Have"),
    (3, "Could Have"),
    (4, "Won't Have"),)
    priority = models.IntegerField(
                  choices=priority_choices,
                  default=2)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="tasks")
    users = models.ManyToManyField(User, blank=True, related_name="assigned_users")
    
    def __str__(self):
        return self.title