from django.urls import path, include
from rest_framework_nested import routers
from .views import *


router = routers.DefaultRouter()
router.register(r'suscripcion', SuscripcionUsuarioViewset)

urlpatterns = [
    path('', include(router.urls)),
]
