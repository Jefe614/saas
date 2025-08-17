# accounts/serializers.py

from rest_framework import serializers
from .models import CustomUser
from companies.serializers import CompanySerializer


class UserSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)

    class Meta:
        model = CustomUser  
        fields = ["id", "username", "email", "first_name", "last_name", "company", "role"]
