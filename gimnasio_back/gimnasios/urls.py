from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter
from .views import *
from miembros.views import *

router = DefaultRouter()
router.register(r'gimnasios', GimnasioViewSet)

# Router anidado para sucursales
sucursal_router = NestedDefaultRouter(router, r'gimnasios', lookup='gimnasio')
sucursal_router.register(r'sucursales', SucursalViewSet, basename='gimnasio-sucursales')

# Router anidado para staff
staff_router = NestedDefaultRouter(sucursal_router, r'sucursales', lookup='sucursal')
staff_router.register(r'staff', StaffViewSet, basename='sucursal-staff')

# Router para horarios
horario_router = NestedDefaultRouter(staff_router, r'staff', lookup='staff')
horario_router.register(r'horarios', HorarioTrabajoViewSet, basename='staff-horarios')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(sucursal_router.urls)),
    path('', include(staff_router.urls)),
    path('', include(horario_router.urls)),
]