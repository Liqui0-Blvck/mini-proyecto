from rest_framework import serializers
from .models import *


class MaquinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maquina
        fields = '__all__'

class EjercicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ejercicio
        fields = '__all__'

class RutinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rutina
        fields = '__all__'
        
class EjercicioEnRutinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EjercicioRutina
        fields = '__all__'

class SesionEntrenamientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SesionEntrenamiento
        fields = '__all__'

class EjercicioRealizadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EjercicioRealizado
        fields = '__all__'

class DescansoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Descanso
        fields = '__all__'