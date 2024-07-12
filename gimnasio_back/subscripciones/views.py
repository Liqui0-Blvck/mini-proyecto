from rest_framework import  viewsets
from .serializers import *
from .models import *
from rest_framework.decorators import action
from rest_framework.response import Response


class SuscripcionUsuarioViewset(viewsets.ModelViewSet):
  queryset = SuscripcionUsuario.objects.all()
  serializer_class = SuscripcionUsuarioSerializer
  
  @action(detail=True, methods=['get'])
  def transacciones(self, request, pk=None):
      suscripcion = self.get_object()
      transacciones = suscripcion.transacciones.all()
      serializer = TransaccionSerializer(transacciones, many=True)
      return Response(serializer.data)
  