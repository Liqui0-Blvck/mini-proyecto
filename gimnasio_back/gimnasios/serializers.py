from rest_framework import serializers
from .models import *

class GimnasioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gimnasio
        fields = '__all__'

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