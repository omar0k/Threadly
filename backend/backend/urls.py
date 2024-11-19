from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from api.views import CreateUserView, hello_world
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("", lambda request: HttpResponse("Hello, World!"), name="hello_world"),
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("api/auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
]
