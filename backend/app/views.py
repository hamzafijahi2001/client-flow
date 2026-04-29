from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import UserSerializer, ClientSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAuthenticated
from .models import Client
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

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]