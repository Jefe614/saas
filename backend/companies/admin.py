from django.contrib import admin
from .models import Company, Customer, Product, Rental, Payment, Order


admin.site.register(Company)
admin.site.register(Customer)
admin.site.register(Product)    
admin.site.register(Rental)
admin.site.register(Payment)
admin.site.register(Order)

# Register your models here.
