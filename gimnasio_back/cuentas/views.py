
from rest_framework import  viewsets, generics
from cuentas.serializers import ActividadSerializer, ConfiguracionUsuarioSerializer, InteresesUsuarioSerializer, PerfilSerializer, RegistroActividadSerializer
from .models import *
from core.serializers import *
from rest_framework.response import Response
from rest_framework.decorators import action



    
class PerfilViewSet(viewsets.ModelViewSet):
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
    
    @action(detail=True, methods=['GET'], url_path='configuracion')
    def configuracion(self, request, pk=None):
        perfil = Perfil.objects.get(pk = pk)
        configuracion = ConfiguracionUsuario.objects.filter(usuario = perfil.usuario).first()
        serializer_conf = ConfiguracionUsuarioSerializer(configuracion)
        return Response(serializer_conf.data)
    
    
    
class ActividadViewSet(viewsets.ModelViewSet):
    queryset = Actividad.objects.all()
    serializer_class = ActividadSerializer
    
class RegistroActividadViewSet(viewsets.ModelViewSet):
    queryset = RegistroActividad.objects.all()
    serializer_class = RegistroActividadSerializer
    
class InteresesUsuarioViewSet(viewsets.ModelViewSet):
    queryset = InteresesUsuario.objects.all()
    serializer_class = InteresesUsuarioSerializer