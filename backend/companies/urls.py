from django.urls import path
from .views import CompanyAPI, CategoryAPIView, ProductAPIView

urlpatterns = [
    path("companies/", CompanyAPI.as_view(), name="company-list-create"),
    path("companies/<int:pk>/", CompanyAPI.as_view(), name="company-detail"),
    path("products/", ProductAPIView.as_view(), name="products-list-create"),
    path("products/<int:product_id>/", ProductAPIView.as_view(), name="product-detail-update-delete"),
    path("categories/", CategoryAPIView.as_view(), name="categories-list-create"),
    path("categories/<int:category_id>/", CategoryAPIView.as_view(), name="category-detail"),
]