from django.urls import path

from .views import  CategoryAPIView, ProductAPIView, AssignAdminView

urlpatterns = [
    path("assign-admin/", AssignAdminView.as_view(), name="assign-admin"),
    path("products/", ProductAPIView.as_view(), name="products-list-create"),
    path("products/<int:product_id>/", ProductAPIView.as_view(), name="product-detail-update-delete"),
    path("categories/", CategoryAPIView.as_view(), name="categories-list-create"),
    path("categories/<int:category_id>/", CategoryAPIView.as_view(), name="category-detail"),
]