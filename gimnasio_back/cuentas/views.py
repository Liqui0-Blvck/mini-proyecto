
from rest_framework import  viewsets
from cuentas.serializers import ActividadSerializer, ConfiguracionUsuarioSerializer, InteresesUsuarioSerializer, PerfilSerializer, RegistroActividadSerializer
from .models import *
from core.serializers import *
from rest_framework.response import Response
from rest_framework.decorators import action



    
class PerfilViewSet(viewsets.ModelViewSet):
    lookup_field = 'usuario__pk'
    queryset = Perfil.objects.all()
    serializer_class = PerfilSerializer
    
    def get_queryset(self):
        # Retorna el perfil del usuario logueado
        return Perfil.objects.filter(usuario=self.request.user)

    @action(detail=False, methods=['patch'], url_path='actualizar_perfil')
    def actualizar_perfil(self, request):
        perfil = Perfil.objects.get(usuario=request.user)
        perfil_data = request.data.get('perfil_data', {})
        usuario_data = request.data.get('usuario_data', {})

        # Actualizar perfil
        perfil_serializer = PerfilSerializer(perfil, data=perfil_data, partial=True)
        if perfil_serializer.is_valid():
            perfil_serializer.save()
        else:
            return Response(perfil_serializer.errors)

        # Actualizar usuario
        usuario_serializer = CustomUserSerializer(request.user, data=usuario_data, partial=True)
        if usuario_serializer.is_valid():
            usuario_serializer.save()
        else:
            return Response(usuario_serializer.errors)

        return Response({
            "perfil": perfil_serializer.data
        })

        # Si necesitas actualizar campos específicos del perfil

    
class ConfiguracionUsuarioViewSet(viewsets.ModelViewSet):
    queryset = ConfiguracionUsuario.objects.first()
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