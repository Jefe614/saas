from accounts.models import CustomUser
from rest_framework import viewsets, status
from rest_framework.response import Response
from django_tenants.utils import get_tenant_model, get_tenant_domain_model
from companies.models import Company, StoreConfig
from companies.serializers import CompanySerializer
from django.db import transaction
import re
from rest_framework.views import APIView

Client = get_tenant_model()
Domain = get_tenant_domain_model()

class CompanyAPI(APIView):
    """
    ViewSet for registering a new company, creating a tenant, domain, store configuration, and admin user.
    Only POST is implemented for company registration.
    """
    def post(self, request):
        print("HEREEEEE")
        """
        POST /api/companies/
        Creates a tenant (Client), domain, company, store configuration, and admin user.
        Expects 'subdomain', 'username', 'password', and optional 'role' (admin/staff/client) in the request data.
        """
        serializer = CompanySerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        name = data.get('name')
        email = data.get('email', '')
        phone = data.get('phone', '')
        address = data.get('address', '')
        subdomain = data.get('subdomain')
        username = data.get('username')
        password = data.get('password')
        role = data.get('role', 'admin')

        # Generate schema_name from subdomain
        schema_name = re.sub(r'[^a-z0-9-]', '', subdomain.lower())[:30]
        full_domain = f"{schema_name}.example.com"

        # Validations
        if not schema_name or not re.match(r'^[a-z0-9-]+$', schema_name):
            return Response(
                {"error": "Invalid subdomain. Use lowercase letters, numbers, and hyphens only."},
                status=status.HTTP_400_BAD_REQUEST
            )
        if Client.objects.filter(schema_name=schema_name).exists():
            return Response(
                {"error": f"Schema name '{schema_name}' is already taken."},
                status=status.HTTP_400_BAD_REQUEST
            )
        if Domain.objects.filter(domain=full_domain).exists():
            return Response(
                {"error": f"Domain '{full_domain}' is already taken."},
                status=status.HTTP_400_BAD_REQUEST
            )
        if not username or not re.match(r'^[a-zA-Z0-9_-]+$', username):
            return Response(
                {"error": "Invalid username. Use letters, numbers, underscores, or hyphens only."},
                status=status.HTTP_400_BAD_REQUEST
            )
        if len(password) < 8:
            return Response(
                {"error": "Password must be at least 8 characters long."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            with transaction.atomic():
                # Create tenant (Client)
                client = Client.objects.create(
                    schema_name=schema_name,
                    name=name,
                    paid_until=None,
                    on_trial=True
                )

                # Create domain
                domain = Domain.objects.create(
                    tenant=client,
                    domain=full_domain,
                    is_primary=True
                )

                # Create company in public schema
                company = Company.objects.create(
                    client=client,
                    name=name,
                    email=email,
                    phone=phone,
                    address=address
                )

                # Switch to tenant schema for StoreConfig and CustomUser creation
                from django_tenants.utils import tenant_context
                with tenant_context(client):
                    # Create default StoreConfig
                    StoreConfig.objects.create(
                        client=client,
                        store_name=name,
                        tagline="Your Trusted Store",
                        hero_title="Welcome to Our Store",
                        hero_subtitle="Discover amazing products at great prices.",
                        cta_text="Shop Now",
                        business_type="other",
                        primary_color="blue",
                        theme="modern"
                    )

                    if CustomUser.objects.filter(username=username).exists():
                        raise ValueError(f"Username '{username}' is already taken in tenant schema.")
                    if email and CustomUser.objects.filter(email=email).exists():
                        raise ValueError(f"Email '{email}' is already taken in tenant schema.")

                    is_staff = role in ['admin', 'staff']
                    is_superuser = False

                    user = CustomUser.objects.create_user(
                        username=username,
                        email=email,
                        password=password,
                        role=role,
                        company=company,
                        is_superuser=is_superuser,
                        is_staff=is_staff
                    )

            # Return serialized company data
            return Response(CompanySerializer(company).data, status=status.HTTP_201_CREATED)

        except ValueError as ve:
            return Response(
                {"error": str(ve)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": f"Failed to create company: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )