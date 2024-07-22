from django.urls import path, include
from rest_framework_nested import routers
from . import views

# Definir el router principal
router = routers.DefaultRouter()
router.register(r'perfil', views.PerfilViewSet, basename='perfil')

# Definir el router anidado para perfil y sus relaciones
perfil_router = routers.NestedDefaultRouter(router, r'perfil', lookup='perfil')
perfil_router.register(r'configuracion', views.ConfiguracionUsuarioViewSet, basename='perfil-configuracion')
perfil_router.register(r'actividad', views.ActividadViewSet, basename='perfil-actividad')
perfil_router.register(r'intereses', views.InteresesUsuarioViewSet, basename='perfil-intereses')

# Definir el router anidado para actividad y sus relaciones
actividad_router = routers.NestedDefaultRouter(perfil_router, r'actividad', lookup='actividad')
actividad_router.register(r'registro-actividad', views.RegistroActividadViewSet, basename='actividad-registro')

# URLs principales
urlpatterns = [
    path('', include(router.urls)),
    path('', include(perfil_router.urls)),
    path('', include(actividad_router.urls)),
]

