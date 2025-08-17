from django.db import models
from django_tenants.models import TenantMixin, DomainMixin

# Tenant Model
class Client(TenantMixin):
    name = models.CharField(max_length=100)
    paid_until = models.DateField(null=True, blank=True)
    on_trial = models.BooleanField(default=True)
    created_on = models.DateField(auto_now_add=True)

    auto_create_schema = True

    def __str__(self):
        return self.name

# Domain Model
class Domain(DomainMixin):
    pass

# Company Model (in public schema, linked to Client)
class Company(models.Model):
    client = models.OneToOneField(Client, on_delete=models.CASCADE, related_name='company_details', null=True, blank=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'public_company'  # Explicitly set to public schema


class Customer( models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'customer'

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'product'

class Rental(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="rentals")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="rentals")
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(
        max_length=20,
        choices=[("active", "Active"), ("returned", "Returned"), ("cancelled", "Cancelled")],
        default="active"
    )

    def __str__(self):
        return f"{self.product.name} rented by {self.customer.name}"

    class Meta:
        db_table = 'rental'

class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="orders")
    rental = models.ForeignKey(Rental, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(
        max_length=20,
        choices=[("pending", "Pending"), ("paid", "Paid"), ("cancelled", "Cancelled")],
        default="pending"
    )

    def __str__(self):
        return f"Order {self.id}"

    class Meta:
        db_table = 'order'

class Payment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="payments")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.CharField(
        max_length=20,
        choices=[("cash", "Cash"), ("card", "Card"), ("mpesa", "Mpesa")],
        default="cash"
    )
    paid_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.amount} for Order {self.order.id}"

    class Meta:
        db_table = 'payment'