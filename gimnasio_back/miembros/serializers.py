from rest_framework import serializers
from .models import *
from cuentas.serializers import PerfilSerializer
from datetime import datetime, time

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
        
class AsistenciaMiembroSerializer(serializers.ModelSerializer):
    duracion = serializers.SerializerMethodField()
    
    def get_duracion(self, obj):
        if obj.hora_entrada and obj.hora_salida:
            # Si hora_entrada y hora_salida son objetos time, conviértelos a datetime
            hoy = datetime.now().date()
            entrada = datetime.combine(hoy, obj.hora_entrada)
            salida = datetime.combine(hoy, obj.hora_salida)

            # Calcula la diferencia entre la hora de salida y la hora de entrada
            duracion = salida - entrada

            # Retorna la duración en formato HH:MM:SS
            horas, resto = divmod(duracion.seconds, 3600)
            minutos, segundos = divmod(resto, 60)
            return f'{horas:02}:{minutos:02}:{segundos:02}'
        return None
    
    class Meta:
        model = AsistenciaMiembro
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