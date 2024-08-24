from rest_framework import serializers
from .models import *
from cuentas.serializers import PerfilSerializer

class MiembroSerializer(serializers.ModelSerializer):
    activo = serializers.SerializerMethodField()
    perfil = serializers.SerializerMethodField()
    
    def get_activo(self, obj):
        return obj.perfil.usuario.is_active
    
    def get_perfil(self, obj):
        perfil = PerfilSerializer(obj.perfil)
        return perfil.data
    
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