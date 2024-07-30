from rest_framework import serializers
from .models import *
from core.serializers import *

class PerfilSerializer(serializers.ModelSerializer):
    usuario = CustomUserSerializer()

    class Meta:
        model = Perfil
        fields = '__all__'  # Incluye todos los campos del modelo, más la URL personalizada

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Ajustar la URL de la imagen de perfil
        if 'imagen_perfil' in representation and representation['imagen_perfil']:
            # Eliminar los parámetros de firma de la URL
            imagen_url = representation['imagen_perfil']
            representation['imagen_perfil'] = imagen_url.split('?')[0]

        return representation

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