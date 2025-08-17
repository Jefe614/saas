from companies.serializers import CompanySerializer, CustomerSerializer
from companies.models import Company, Customer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django_tenants.utils import get_tenant_model, get_tenant_domain_model

Client = get_tenant_model()
Domain = get_tenant_domain_model()

class CompanyAPI(APIView):
    def get(self, request, pk=None):
        if pk:
            try:
                company = Company.objects.get(pk=pk)
                return Response(CompanySerializer(company).data)
            except Company.DoesNotExist:
                return Response({"error": "Company not found"}, status=status.HTTP_404_NOT_FOUND)
        companies = Company.objects.all()
        return Response(CompanySerializer(companies, many=True).data)

    def post(self, request):
        data = request.data
        # Create Client and Domain first
        client = Client.objects.create(schema_name=data.get("domain"), name=data.get("name"))
        domain = Domain.objects.create(tenant=client, domain=data.get("domain") + ".example.com")
        # Create Company without domain
        company = Company.objects.create(client=client, name=data.get("name"))
        return Response(CompanySerializer(company).data, status=status.HTTP_201_CREATED)

    def put(self, request, pk):
        try:
            company = Company.objects.get(pk=pk)
        except Company.DoesNotExist:
            return Response({"error": "Company not found"}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        company.name = data.get("name", company.name)
        company.email = data.get("email", company.email)  # Only update email, not domain
        company.phone = data.get("phone", company.phone)
        company.address = data.get("address", company.address)
        company.save()
        return Response(CompanySerializer(company).data)

    def delete(self, request, pk):
        try:
            company = Company.objects.get(pk=pk)
            company.client.delete()  # Deletes the tenant and its schema
            return Response({"message": "Company deleted"})
        except Company.DoesNotExist:
            return Response({"error": "Company not found"}, status=status.HTTP_404_NOT_FOUND)

class CustomerAPI(APIView):
    def get(self, request, pk=None):
        if pk:
            try:
                customer = Customer.objects.get(pk=pk)
                return Response(CustomerSerializer(customer).data)
            except Customer.DoesNotExist:
                return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)
        customers = Customer.objects.all()
        return Response(CustomerSerializer(customers, many=True).data)

    def post(self, request):
        data = request.data
        try:
            client = Client.objects.get(schema_name=request.tenant.schema_name)  # Current tenant
        except Client.DoesNotExist:
            return Response({"error": "Tenant not found"}, status=status.HTTP_404_NOT_FOUND)

        customer = Customer.objects.create(
            name=data.get("name"),
            email=data.get("email"),
            phone=data.get("phone")
        )
        return Response(CustomerSerializer(customer).data, status=status.HTTP_201_CREATED)

    def put(self, request, pk):
        try:
            customer = Customer.objects.get(pk=pk)
        except Customer.DoesNotExist:
            return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        customer.name = data.get("name", customer.name)
        customer.email = data.get("email", customer.email)
        customer.phone = data.get("phone", customer.phone)
        customer.save()
        return Response(CustomerSerializer(customer).data)

    def delete(self, request, pk):
        try:
            customer = Customer.objects.get(pk=pk)
            customer.delete()
            return Response({"message": "Customer deleted"})
        except Customer.DoesNotExist:
            return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)