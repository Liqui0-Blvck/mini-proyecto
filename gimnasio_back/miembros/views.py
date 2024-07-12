from rest_framework import viewsets
from .models import *
from .serializers import *

class MiembrosViewSet(viewsets.ModelViewSet):
    queryset = Miembro.objects.all()
    serializer_class = MiembroSerializer

class SeguimientoPesoViewSet(viewsets.ModelViewSet):
    queryset = SeguimientoPeso.objects.all()
    serializer_class = SeguimientoPesoSerializer

class EvaluacionesFisicasViewSet(viewsets.ModelViewSet):
    queryset = EvaluacionesFisicas.objects.all()
    serializer_class = EvaluacionesFisicasSerializer

class MetasPersonalesViewSet(viewsets.ModelViewSet):
    queryset = MetasPersonales.objects.all()
    serializer_class = MetasPersonalesSerializer