from django.urls import path
from .views import register_user, activate_user, cambiar_contrasena, verificar_token


urlpatterns = [
    path('register/', register_user, name='register'),
    path('activate/<uidb64>/<token>/', activate_user, name='activate_user'),
    path('cambiar-contrasena/', cambiar_contrasena, name='cambiar_contrasena'),
    path('verificar-token-activacion/', verificar_token, name='verificar_token'), 
]
