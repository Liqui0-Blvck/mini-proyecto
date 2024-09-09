from rest_framework import serializers
from .models import *

class GimnasioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gimnasio
        fields = '__all__'
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Ajustar la URL de la imagen de perfil
        if 'logo' in representation and representation['logo']:
            # Eliminar los parámetros de firma de la URL
            imagen_url = representation['logo']
            representation['logo'] = imagen_url.split('?')[0]

        return representation

class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = '__all__'


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

class HorarioTrabajoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorarioTrabajo
        fields = '__all__'