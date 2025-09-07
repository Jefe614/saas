from rest_framework import serializers
from .models import StoreConfig, Category, Product, Customer, Order, OrderItem, Payment

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
    

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price',
            'image', 'rating', 'reviews_count', 'is_available',
            'badge', 'categories', 'category'
        ]

    def get_categories(self, obj):
        return [cat.name for cat in obj.categories.all()]

    def get_category(self, obj):
        categories = [cat.name for cat in obj.categories.all()]
        return categories[0] if categories else 'Uncategorized'


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
