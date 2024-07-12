from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'maquinas', MaquinaViewSet)
router.register(r'ejercicios', EjercicioViewSet)
router.register(r'rutinas', RutinaViewSet)
router.register(r'sesiones', SesionEntrenamientoViewSet)

# Router anidado para ejercicios realizados
ejercicio_realizado_router = NestedDefaultRouter(router, r'sesiones', lookup='sesion')
ejercicio_realizado_router.register(r'ejercicios_realizados', EjercicioRealizadoViewSet, basename='sesion-ejercicios_realizados')

# Router anidado para descansos
descanso_router = NestedDefaultRouter(ejercicio_realizado_router, r'ejercicios_realizados', lookup='ejercicio_realizado')
descanso_router.register(r'descansos', DescansoViewSet, basename='ejercicio_realizado-descansos')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(ejercicio_realizado_router.urls)),
    path('', include(descanso_router.urls)),
]
