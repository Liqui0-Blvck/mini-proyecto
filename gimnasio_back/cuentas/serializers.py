from rest_framework import serializers
from .models import *
from core.serializers import *

class PerfilSerializer(serializers.ModelSerializer):
    usuario = CustomUserSerializer()
    imagen_perfil_url = serializers.SerializerMethodField()  # Campo para la URL de la imagen

    class Meta:
        model = Perfil
        fields = '__all__'  # Incluye todos los campos del modelo, más la URL personalizada

    def get_imagen_perfil_url(self, obj):
        if obj.imagen_perfil:
            return obj.imagen_perfil.url
        return None

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