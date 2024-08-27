from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response



class GimnasioViewSet(viewsets.ModelViewSet):
    queryset = Gimnasio.objects.all()
    serializer_class = GimnasioSerializer
    
    @action(detail=False, methods=['get'], url_path='gimnasio')
    def obtener_gimnasio_dueno(self, request):
        dueno = request.query_params.get('dueno')
        gimnasio = Gimnasio.objects.get(dueno=dueno, activo = True)
        serializer = self.get_serializer(gimnasio)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], url_path='activo')
    def cambiar_gimnasio_selecto(self, request):
        gimnasio_id = request.data.get('gimnasio_id')
        try:
            gimnasio = Gimnasio.objects.get(id=gimnasio_id)
        except Gimnasio.DoesNotExist:
            return Response({"detail": "Gimnasio no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        Gimnasio.objects.update(activo=False)
        gimnasio.activo = True
        gimnasio.save()
        serializer = GimnasioSerializer(gimnasio)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail= True, methods=['get'], url_path='sucursal')
    def obtener_sucursal_por_defecto(self, request, pk = None):
        gimnasio = Gimnasio.objects.get(pk = pk, activo = True)
        sucursal = Sucursal.objects.get(gimnasio = gimnasio, activo = True)
        serializer = SucursalSerializer(sucursal)
        return Response(serializer.data)
    
    
    @action(detail=False, methods=['POST'], url_path='sucursal/activo')
    def cambiar_actividad_sucursal(self, request):
        sucursal_id = request.data.get('sucursal_id')
        try:
            sucursal = Sucursal.objects.get(id=sucursal_id)
        except Sucursal.DoesNotExist:
            return Response({"detail": "Sucursal no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        Sucursal.objects.update(activo=False)
        sucursal.activo = True
        sucursal.save()
        serializer = SucursalSerializer(sucursal)
        return Response(serializer.data, status=status.HTTP_200_OK)
        

class SucursalViewSet(viewsets.ModelViewSet):
    queryset = Sucursal.objects.all()
    serializer_class = SucursalSerializer


class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

class HorarioTrabajoViewSet(viewsets.ModelViewSet):
    queryset = HorarioTrabajo.objects.all()
    serializer_class = HorarioTrabajoSerializer
