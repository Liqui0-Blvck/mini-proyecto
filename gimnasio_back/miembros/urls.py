from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'miembros', MiembrosViewSet)

# Router anidado para seguimientos
seguimiento_router = NestedDefaultRouter(router, r'miembros', lookup='miembro')
seguimiento_router.register(r'seguimientos', SeguimientoPesoViewSet, basename='miembro-seguimientos')

# Router anidado para evaluaciones físicas
evaluaciones_router = NestedDefaultRouter(router, r'miembros', lookup='miembro')
evaluaciones_router.register(r'evaluaciones', EvaluacionesFisicasViewSet, basename='miembro-evaluaciones')

# Router anidado para metas personales
metas_router = NestedDefaultRouter(router, r'miembros', lookup='miembro')
metas_router.register(r'metas', MetasPersonalesViewSet, basename='miembro-metas')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(seguimiento_router.urls)),
    path('', include(evaluaciones_router.urls)),
    path('', include(metas_router.urls)),
]