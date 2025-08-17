from django.urls import path
from .views import CompanyAPI

urlpatterns = [
    # Company
    path("companies/", CompanyAPI.as_view(), name="company-list-create"),
    path("companies/<int:pk>/", CompanyAPI.as_view(), name="company-detail"),

    # # Customers
    # path("customers/", views.CustomerListCreateView.as_view(), name="customer-list-create"),
    # path("customers/<int:pk>/", views.CustomerDetailView.as_view(), name="customer-detail"),

    # # Products
    # path("products/", views.ProductListCreateView.as_view(), name="product-list-create"),
    # path("products/<int:pk>/", views.ProductDetailView.as_view(), name="product-detail"),

    # # Rentals
    # path("rentals/", views.RentalListCreateView.as_view(), name="rental-list-create"),
    # path("rentals/<int:pk>/", views.RentalDetailView.as_view(), name="rental-detail"),

    # # Orders
    # path("orders/", views.OrderListCreateView.as_view(), name="order-list-create"),
    # path("orders/<int:pk>/", views.OrderDetailView.as_view(), name="order-detail"),

    # # Payments
    # path("payments/", views.PaymentListCreateView.as_view(), name="payment-list-create"),
    # path("payments/<int:pk>/", views.PaymentDetailView.as_view(), name="payment-detail"),
]
