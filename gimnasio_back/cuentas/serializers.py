from rest_framework import serializers
from .models import *
from core.serializers import *

class PerfilSerializer(serializers.ModelSerializer):
    usuario = CustomUserSerializer()
    class Meta:
        model = Perfil
        fields = '__all__'

class ConfiguracionUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfiguracionUsuario
        fields = '__all__'
        
class ActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actividad
        fields = '__all__'
        
class RegistroActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroActividad
        fields = '__all__'
        
class InteresesUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = InteresesUsuario
        fields = '__all__'