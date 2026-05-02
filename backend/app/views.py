from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import UserSerializer, ClientSerializer, ProjectSerializer,TaskSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAuthenticated
from .models import Client,Project,Task
# Create your views here.


class ClientListCreate(generics.ListCreateAPIView):
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Client.objects.filter(username=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(username=self.request.user)
        else:
            print(serializer.errors)

class ClientDelete(generics.DestroyAPIView):
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Client.objects.filter(username=user)



class ProjectListCreate(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        client_id = self.kwargs["client_pk"]
        return Project.objects.filter(client_id=client_id)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            client_id = self.kwargs["client_pk"]
            serializer.save(client_id=client_id)
        else:
            print(serializer.errors)

class ProjectDelete(generics.DestroyAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        client_id = self.kwargs["client_pk"]
        return Project.objects.filter(client_id=client_id)

class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        project_id = self.kwargs["project_pk"]
        return Task.objects.filter(project_id=project_id)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            project_id = self.kwargs["project_pk"]
            serializer.save(project_id=project_id)
        else:
            print(serializer.errors)

class TaskDelete(generics.DestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        project_id = self.kwargs["project_pk"]
        return Task.objects.filter(project_id=project_id)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]