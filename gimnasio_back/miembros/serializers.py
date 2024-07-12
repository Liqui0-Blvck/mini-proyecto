from rest_framework import serializers
from .models import *

class MiembroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Miembro
        fields = '__all__'

class SeguimientoPesoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeguimientoPeso
        fields = '__all__'

class EvaluacionesFisicasSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluacionesFisicas
        fields = '__all__'

class MetasPersonalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetasPersonales
        fields = '__all__'