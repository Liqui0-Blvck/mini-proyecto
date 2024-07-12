from rest_framework import serializers
from .models import *

class TransaccionSerializer(serializers.ModelSerializer):
  class Meta:
    model = TransaccionPago
    fields = '__all__'
    
class SuscripcionUsuarioSerializer(serializers.ModelSerializer):
  class Meta:
    model = SuscripcionUsuario
    fields = '__all__'