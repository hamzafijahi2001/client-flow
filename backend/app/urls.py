from django.urls import path
from . import views

urlpatterns = [
    path("clients/", views.ClientListCreate.as_view(), name="client-list"),
    path("clients/delete/<int:pk>/", views.ClientDelete.as_view(), name="delete-client"),
    path("clients/<int:client_pk>/projects/", views.ProjectListCreate.as_view(), name="project-list"),
    path("clients/<int:client_pk>/project/delete/<int:pk>/", views.ProjectDelete.as_view(), name="delete-project"),
    path("clients/<int:client_pk>/projects/<int:project_pk>/tasks/", views.TaskListCreate.as_view(), name="task-list"),
    path("clients/<int:client_pk>/project/<int:project_pk>/task/delete/<int:pk>/", views.TaskDelete.as_view(), name="delete-task"),
    path("clients/<int:pk>/update/", views.ClientUpdate.as_view()),
    path("clients/<int:client_pk>/projects/<int:pk>/update/", views.ProjectUpdate.as_view()),
    path("clients/<int:client_pk>/projects/<int:project_pk>/tasks/<int:pk>/update/", views.TaskUpdate.as_view()),
]