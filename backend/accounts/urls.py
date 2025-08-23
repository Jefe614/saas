from django.urls import path

from companies.views.company import CompanyAPI

from .views import LoginView, ProfileView, RegisterView

urlpatterns = [
    # path("register/", RegisterView.as_view(), name="register"),
    path("register/", CompanyAPI.as_view(), name="company-list-create"),
    path("login/", LoginView.as_view(), name="login"),
    path("profile/", ProfileView.as_view(), name="profile"),
]
