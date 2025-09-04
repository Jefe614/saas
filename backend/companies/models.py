from django.db import models
from django_tenants.models import TenantMixin, DomainMixin
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.management import call_command


# Tenant Model (Public Schema)
class Client(TenantMixin):
    name = models.CharField(max_length=100)
    paid_until = models.DateField(null=True, blank=True)
    on_trial = models.BooleanField(default=True)
    created_on = models.DateTimeField(auto_now_add=True)

    auto_create_schema = True

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if is_new:
            call_command("migrate_schemas", schema_name=self.schema_name, interactive=False)

# Domain Model (Public Schema)
class Domain(DomainMixin):
    pass

# Company Model (Public Schema, for tenant metadata)
class Company(models.Model):
    client = models.OneToOneField(Client, on_delete=models.CASCADE, related_name='company_details', null=True, blank=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    subdomain = models.CharField(max_length=100, unique=True, null=True, blank=True) 

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'public_company'

# Store Configuration Model (Tenant-specific, in tenant schema)
class StoreConfig(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='store_configs', null=True, blank=True)
    client = models.OneToOneField(Client, on_delete=models.CASCADE, related_name='store_config')
    store_name = models.CharField(max_length=255, default='My Store')
    tagline = models.CharField(max_length=255, blank=True, null=True)
    hero_title = models.CharField(max_length=255, blank=True, null=True)
    hero_subtitle = models.TextField(blank=True, null=True)
    hero_image = models.URLField(max_length=500, blank=True, null=True)
    cta_text = models.CharField(max_length=100, default='Shop Now')
    business_type = models.CharField(
        max_length=100,
        choices=[
            ('electronics', 'Electronics & Technology'),
            ('fashion', 'Fashion Boutique'),
            ('home_garden', 'Home & Garden'),
            ('sports', 'Sports Equipment'),
            ('books_media', 'Books & Media'),
            ('handmade', 'Handmade Crafts'),
            ('other', 'Other Retail')
        ],
        default='electronics'
    )
    primary_color = models.CharField(max_length=20, default='blue')  # e.g., 'blue', '#1E90FF'
    about_text = models.TextField(blank=True, null=True)
    theme = models.CharField(
        max_length=50,
        choices=[('modern', 'Modern'), ('minimal', 'Minimal'), ('classic', 'Classic')],
        default='modern'
    )

    def __str__(self):
        return f"{self.store_name} Config"

    class Meta:
        db_table = 'store_config'

# Category Model (Tenant-specific)
class Category(models.Model):
    name = models.CharField(max_length=255)
    image = models.URLField(max_length=500, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    product_count = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'category'

# Product Model (Tenant-specific)
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    image = models.URLField(max_length=500, blank=True, null=True)
    rating = models.FloatField(default=0.0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    reviews_count = models.IntegerField(default=0)
    is_available = models.BooleanField(default=True)
    badge = models.CharField(
        max_length=50,
        choices=[
            ('best_seller', 'Best Seller'),
            ('new_arrival', 'New Arrival'),
            ('sale', 'Sale'),
            ('popular', 'Popular'),
            ('limited', 'Limited'),
            ('out_of_stock', 'Out of Stock')
        ],
        blank=True,
        null=True
    )
    categories = models.ManyToManyField(Category, related_name='products')

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'product'

# Customer Model (Tenant-specific)
class Customer(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'customer'

# Order Model (Tenant-specific)
class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(
        max_length=20,
        choices=[('pending', 'Pending'), ('paid', 'Paid'), ('cancelled', 'Cancelled')],
        default='pending'
    )

    def __str__(self):
        return f"Order {self.id}"

    class Meta:
        db_table = 'order'

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in Order {self.order.id}"

    class Meta:
        db_table = 'order_item'

# Payment Model (Tenant-specific)
class Payment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.CharField(
        max_length=20,
        choices=[('cash', 'Cash'), ('card', 'Card'), ('mpesa', 'Mpesa')],
        default='cash'
    )
    paid_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.amount} for Order {self.order.id}"

    class Meta:
        db_table = 'payment'