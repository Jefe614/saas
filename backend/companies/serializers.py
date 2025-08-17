# companies/serializers.py

from rest_framework import serializers
from .models import Company, Customer, Product, Rental, Payment


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"


class CustomerSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)

    class Meta:
        model = Customer
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"


class RentalSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Rental
        fields = "__all__"


class PaymentSerializer(serializers.ModelSerializer):
    rental = RentalSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = "__all__"
