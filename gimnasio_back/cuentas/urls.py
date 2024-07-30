from django.urls import path, include
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register(r'perfil', views.PerfilViewSet, basename='perfil')

# Definir el router anidado para perfil y sus relaciones
perfil_router = routers.NestedDefaultRouter(router, r'perfil', lookup='perfil')
perfil_router.register(r'intereses', views.InteresesUsuarioViewSet, basename='perfil-intereses')

# URLs principales
urlpatterns = [
    path('', include(router.urls)),
    path('', include(perfil_router.urls)),
]