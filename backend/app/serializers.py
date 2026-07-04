from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Client,Project,Task


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","email","first_name","last_name","username","password"]
        extra_kwargs = {"password":{"write_only":True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"
        extra_kwargs = {"username": {"read_only": True}}

class ProjectSerializer(serializers.ModelSerializer):
    users = serializers.SlugRelatedField(many=True, read_only=True, slug_field="email")
    class Meta:
        model = Project
        fields = "__all__"
        extra_kwargs = {"client": {"read_only": True}}

class TaskSerializer(serializers.ModelSerializer):
    users = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field="email"
    )
    class Meta:
        model = Task
        fields = "__all__"
        extra_kwargs = {"project": {"read_only": True}}
        