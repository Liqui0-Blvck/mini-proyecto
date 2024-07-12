from rest_framework import viewsets
from .models import *
from .serializers import *

class MaquinaViewSet(viewsets.ModelViewSet):
    queryset = Maquina.objects.all()
    serializer_class = MaquinaSerializer

class EjercicioViewSet(viewsets.ModelViewSet):
    queryset = Ejercicio.objects.all()
    serializer_class = EjercicioSerializer

class RutinaViewSet(viewsets.ModelViewSet):
    queryset = Rutina.objects.all()
    serializer_class = RutinaSerializer

class SesionEntrenamientoViewSet(viewsets.ModelViewSet):
    queryset = SesionEntrenamiento.objects.all()
    serializer_class = SesionEntrenamientoSerializer

class EjercicioRealizadoViewSet(viewsets.ModelViewSet):
    queryset = EjercicioRealizado.objects.all()
    serializer_class = EjercicioRealizadoSerializer

class DescansoViewSet(viewsets.ModelViewSet):
    queryset = Descanso.objects.all()
    serializer_class = DescansoSerializer