from rest_framework import serializers
from .models import StoreConfig, Category, Product, Customer, Order, OrderItem, Payment, Company

# Company Serializer (Public Schema)
class CompanySerializer(serializers.ModelSerializer):
    subdomain = serializers.CharField(write_only=True)
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    role = serializers.ChoiceField(choices=['admin', 'staff', 'client'], write_only=True, default='admin')

    class Meta:
        model = Company
        fields = ['id', 'name', 'email', 'phone', 'address', 'created_at', 'subdomain', 'username', 'password', 'role']
        read_only_fields = ['id', 'created_at']
# StoreConfig Serializer
class StoreConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreConfig
        fields = [
            'store_name', 'tagline', 'hero_title', 'hero_subtitle', 'hero_image',
            'cta_text', 'business_type', 'primary_color', 'about_text', 'theme'
        ]

# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'image', 'description', 'product_count']

# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), many=True, write_only=True, source='categories'
    )

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'original_price', 'image',
            'rating', 'reviews_count', 'is_available', 'badge', 'categories', 'category_ids'
        ]

# Customer Serializer
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'email', 'phone', 'address']

# Order Item Serializer
class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), source='product', write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'quantity', 'price']

# Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    customer = CustomerSerializer(read_only=True)
    customer_id = serializers.PrimaryKeyRelatedField(
        queryset=Customer.objects.all(), source='customer', write_only=True
    )

    class Meta:
        model = Order
        fields = [
            'id', 'customer', 'customer_id', 'items', 'total_amount',
            'status', 'created_at'
        ]

# Payment Serializer
class PaymentSerializer(serializers.ModelSerializer):
    order = OrderSerializer(read_only=True)
    order_id = serializers.PrimaryKeyRelatedField(
        queryset=Order.objects.all(), source='order', write_only=True
    )

    class Meta:
        model = Payment
        fields = ['id', 'order', 'order_id', 'amount', 'method', 'paid_at']