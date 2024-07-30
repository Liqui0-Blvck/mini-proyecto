# core/urls.py

from django.urls import path
from .views import register_user, activate_user

urlpatterns = [
    path('register/', register_user, name='register'),
    path('activate/<uidb64>/<token>/', activate_user, name='activate_user'),
]
