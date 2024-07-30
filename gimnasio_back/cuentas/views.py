
from rest_framework import  viewsets, generics
from cuentas.serializers import ConfiguracionUsuarioSerializer, InteresesUsuarioSerializer, PerfilSerializer
from .models import *
from core.serializers import *
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status



    
class PerfilViewSet(viewsets.ModelViewSet):
    queryset = Perfil.objects.all()
    serializer_class = PerfilSerializer
    
    def get_queryset(self):
        # Retorna el perfil del usuario logueado
        return Perfil.objects.filter(usuario=self.request.user)
    
    @action(detail=True, methods=['PATCH'], url_path='actualizar_imagen')
    def imagen_perfil(self, request, pk=None):
        perfil = Perfil.objects.filter(pk = pk).update(imagen_perfil = request.data.get('imagen_perfil'))
        serializer_perfil = PerfilSerializer(perfil)
        return Response(serializer_perfil.data)
    

    @action(detail=False, methods=['patch'], url_path='actualizar_perfil')
    def actualizar_perfil(self, request):
        perfil = Perfil.objects.get(usuario=request.user)
        perfil_data = request.data.get('perfil_data', {})
        usuario_data = request.data.get('usuario_data', {})

        perfil_serializer = PerfilSerializer(perfil, data=perfil_data, partial=True)
        if perfil_serializer.is_valid():
            perfil_serializer.save()
        else:
            return Response(perfil_serializer.errors)

        usuario_serializer = CustomUserSerializer(request.user, data=usuario_data, partial=True)
        if usuario_serializer.is_valid():
            usuario_serializer.save()
        else:
            return Response(usuario_serializer.errors)

        return Response(perfil_serializer.data)
    
    @action(detail=True, methods=['GET'], url_path='configuracion')
    def configuracion(self, request, pk=None):
        perfil = Perfil.objects.get(pk = pk)
        configuracion = ConfiguracionUsuario.objects.filter(usuario = perfil.usuario).first()
        serializer_conf = ConfiguracionUsuarioSerializer(configuracion)
        return Response(serializer_conf.data)
    
    @action(detail=True, methods=['PATCH'], url_path='actualizar_configuracion')
    def configuracion_actualizado(self, request, pk=None):
        perfil = Perfil.objects.get(pk=pk)
        configuracion = ConfiguracionUsuario.objects.get(usuario=perfil.usuario)
        serializer = ConfiguracionUsuarioSerializer(configuracion, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    
class InteresesUsuarioViewSet(viewsets.ModelViewSet):
    queryset = InteresesUsuario.objects.all()
    serializer_class = InteresesUsuarioSerializer