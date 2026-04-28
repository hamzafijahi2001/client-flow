from django.urls import path
from . import views

urlpatterns = [
    path("clients/", views.ClientListCreate.as_view(), name="client-list"),
    path("notes/delete/<int:pk>/", views.ClientDelete.as_view(), name="delete-client"),
]