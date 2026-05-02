from django.urls import path
from . import views

urlpatterns = [
    path("clients/", views.ClientListCreate.as_view(), name="client-list"),
    path("clients/delete/<int:pk>/", views.ClientDelete.as_view(), name="delete-client"),
    path("clients/<int:client_pk>/projects/", views.ProjectListCreate.as_view(), name="project-list"),
    path("clients/<int:client_pk>/project/delete/<int:pk>/", views.ProjectDelete.as_view(), name="delete-project"),
]