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




class ProductSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()
    originalPrice = serializers.SerializerMethodField()
    priceValue = serializers.DecimalField(max_digits=10, decimal_places=2, source='price')
    originalPriceValue = serializers.DecimalField(max_digits=10, decimal_places=2, source='original_price', allow_null=True)
    badge = serializers.CharField(source='badge', allow_null=True)
    badgeValue = serializers.CharField(source='badge', allow_null=True)
    reviews = serializers.IntegerField(source='reviews_count')
    inStock = serializers.BooleanField(source='is_available')

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'originalPrice', 'priceValue',
            'originalPriceValue', 'image', 'rating', 'reviews', 'inStock',
            'badge', 'badgeValue', 'categories', 'category'
        ]

    def get_categories(self, obj):
        return [cat.name for cat in obj.categories.all()]

    def get_category(self, obj):
        categories = [cat.name for cat in obj.categories.all()]
        return categories[0] if categories else 'Uncategorized'

    def get_price(self, obj):
        return f'${obj.price:.2f}'

    def get_originalPrice(self, obj):
        return f'${obj.original_price:.2f}' if obj.original_price else None

class CategorySerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField()
    productCount = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'image', 'description', 'count', 'productCount']

    def get_count(self, obj):
        return f'{obj.products.count()}+ products'

    def get_productCount(self, obj):
        return obj.products.count()

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
