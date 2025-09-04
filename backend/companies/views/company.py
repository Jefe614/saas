from accounts.models import CustomUser
from rest_framework import viewsets, status
from rest_framework.response import Response
from django_tenants.utils import schema_context, tenant_context
from companies.models import Client, Company, Domain, StoreConfig
from companies.serializers import CompanySerializer
from django.db import transaction
import re
from rest_framework.views import APIView

class CompanyAPI(APIView):
    """
    API endpoint to register a new company (tenant), create its schema, domain, store config, and admin user.
    """

    def post(self, request):
        data = request.data
        print("Validated Data:", data)

        name = data.get('name')
        email = data.get('email', '')
        phone = data.get('phone', '')
        address = data.get('address', '')
        subdomain = data.get('subdomain')
        username = data.get('username')
        password = data.get('password')
        role = data.get('role', 'admin')

        schema_name = re.sub(r'[^a-z0-9_]', '', subdomain.lower())[:30]
        full_domain = f"{schema_name}.localhost"  # 👈 for local dev

        # 🔹 Basic validation
        if not schema_name or not re.match(r'^[a-z0-9_]+$', schema_name):
            return Response({"error": "Invalid subdomain."}, status=status.HTTP_400_BAD_REQUEST)
        if len(password) < 8:
            return Response({"error": "Password must be at least 8 characters long."},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            with schema_context('public'):  # 👈 Force public schema
                with transaction.atomic():
                    # 🔹 Create Tenant (Client)
                    client = Client.objects.create(
                        schema_name=schema_name,
                        name=name,
                        paid_until=None,
                        on_trial=True
                    )

                    # 🔹 Assign Domain
                    Domain.objects.create(
                        tenant=client,
                        domain=full_domain,
                        is_primary=True
                    )

                    # 🔹 Save Company record in Public Schema
                    company = Company.objects.create(
                        client=client,
                        name=name,
                        email=email,
                        phone=phone,
                        address=address,
                        subdomain=subdomain
                    )

            # 🔹 Switch to tenant schema to create tenant-specific data
            with tenant_context(client):
                StoreConfig.objects.create(
                    client=client,
                    store_name=name,
                    tagline="Your Trusted Store",
                    hero_title="Welcome to Our Store",
                    hero_subtitle="Discover amazing products.",
                    cta_text="Shop Now",
                    business_type="other",
                    primary_color="blue",
                    theme="modern"
                )

                if CustomUser.objects.filter(username=username).exists():
                    raise ValueError(f"Username '{username}' is already taken.")
                if email and CustomUser.objects.filter(email=email).exists():
                    raise ValueError(f"Email '{email}' is already taken.")

                user = CustomUser.objects.create_user(
                    username=username,
                    email=email,
                    password=password,
                    role=role,
                    company=company,
                    is_staff=(role in ['admin', 'staff']),
                    is_superuser=(role == 'admin')
                )

            return Response(CompanySerializer(company).data, status=status.HTTP_201_CREATED)

        except ValueError as ve:
            return Response({"error": str(ve)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": f"Failed to create company: {str(e)}"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)