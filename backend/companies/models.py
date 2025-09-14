from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User

from django.core.validators import FileExtensionValidator

class BusinessProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='business_profile')
    business_name = models.CharField(max_length=255)
    business_email = models.EmailField(blank=True, null=True)
    business_phone = models.CharField(max_length=20, blank=True, null=True)
    business_address = models.TextField(blank=True, null=True)
    paid_until = models.DateField(null=True, blank=True)
    on_trial = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    subdomain = models.CharField(max_length=100, unique=True, null=True, blank=True) 

    def __str__(self):
        return f"{self.business_name} ({self.user.username})"

    class Meta:
        db_table = 'business_profile'


class StoreConfig(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='store_config')
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
        return f"{self.store_name} ({self.user.username})"

    class Meta:
        db_table = 'store_config'

# Category Model (linked to User)
class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories')
    name = models.CharField(max_length=255)
    image = models.URLField(max_length=500, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    product_count = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.user.username})"

    class Meta:
        db_table = 'category'
        verbose_name_plural = 'Categories'
        unique_together = ('user', 'name')  # Unique category names per user

# Product Model (linked to User)
class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    image = models.ImageField(
    upload_to='products/',
    blank=True,
    null=True,
    validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])]
    )
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
        return f"{self.name} ({self.user.username})"

    class Meta:
        db_table = 'product'

# Customer Model (linked to User)
class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='customers')
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.user.username})"

    class Meta:
        db_table = 'customer'
        # Ensure email uniqueness per user, not globally
        unique_together = ('user', 'email')

# Order Model (linked to User through Customer)
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(
        max_length=20,
        choices=[('pending', 'Pending'), ('paid', 'Paid'), ('cancelled', 'Cancelled')],
        default='pending'
    )

    def __str__(self):
        return f"Order {self.id} ({self.user.username})"

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

# Payment Model (linked to User through Order)
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