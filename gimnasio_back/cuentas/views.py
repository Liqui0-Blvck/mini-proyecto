
from rest_framework import  viewsets
from cuentas.serializers import ActividadSerializer, ConfiguracionUsuarioSerializer, InteresesUsuarioSerializer, PerfilSerializer, RegistroActividadSerializer
from .models import *


    
class PerfilViewSet(viewsets.ModelViewSet):
    queryset = Perfil.objects.all()
    serializer_class = PerfilSerializer
    
class ConfiguracionUsuarioViewSet(viewsets.ModelViewSet):
    queryset = ConfiguracionUsuario.objects.all()
    serializer_class = ConfiguracionUsuarioSerializer
    
class ActividadViewSet(viewsets.ModelViewSet):
    queryset = Actividad.objects.all()
    serializer_class = ActividadSerializer
    
class RegistroActividadViewSet(viewsets.ModelViewSet):
    queryset = RegistroActividad.objects.all()
    serializer_class = RegistroActividadSerializer
    
class InteresesUsuarioViewSet(viewsets.ModelViewSet):
    queryset = InteresesUsuario.objects.all()
    serializer_class = InteresesUsuarioSerializer