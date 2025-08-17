from .models import CustomUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django_tenants.utils import get_tenant_model, get_tenant_domain_model
from .serializers import UserSerializer
from companies.models import Company

Client = get_tenant_model()
Domain = get_tenant_domain_model()

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        try:
            client = Client.objects.get(schema_name=data.get("company_name"))
            company = client.company_details  # Access company details
        except Client.DoesNotExist:
            return Response({"error": "Invalid company domain"}, status=400)

        user = CustomUser.objects.create_user(
            username=data.get("username"),
            email=data.get("email"),
            password=data.get("password"),
            company=company,
            role="client"
        )
        return Response({"message": "User registered successfully", "user": UserSerializer(user).data}, status=status.HTTP201_CREATED)

class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "user": UserSerializer(user).data})
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(UserSerializer(user).data)

    def put(self, request):
        user = request.user
        data = request.data
        user.first_name = data.get("first_name", user.first_name)
        user.last_name = data.get("last_name", user.last_name)
        user.email = data.get("email", user.email)
        user.role = data.get("role", user.role)
        if data.get("password"):
            user.set_password(data.get("password"))
        user.save()
        return Response(UserSerializer(user).data)

    def delete(self, request):
        user = request.user
        user.delete()
        logout(request)
        return Response({"message": "User deleted"})