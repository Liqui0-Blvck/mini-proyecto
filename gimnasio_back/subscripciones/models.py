# En subscripciones/models.py

from django.db import models
from django.conf import settings
from subscripciones.options import *
from core.models import *

class TransaccionPago(BaseHistoricalModel):
    miembro = models.ForeignKey('miembros.Miembro', on_delete=models.CASCADE, related_name='transacciones')
    cantidad = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_transaccion = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=ESTADOS_PAGO)
    metodo_pago = models.CharField(max_length=20, choices=METODOS_PAGO)

    def __str__(self):
        return f'Transacción de {self.miembro.perfil.usuario.username} - {self.cantidad}'

    class Meta:
        ordering = ['-fecha_transaccion']


class SuscripcionUsuario(BaseHistoricalModel):
    miembro = models.OneToOneField('miembros.Miembro', on_delete=models.CASCADE, related_name='suscripcion')
    tipo_membresia = models.CharField(max_length=50, choices=TIPOS_MEMBRESIA, blank=True)
    fecha_inicio = models.DateTimeField(null=True, blank=True)
    fecha_expiracion = models.DateTimeField(null=True, blank=True)
    activa = models.BooleanField(default=True) 
    transacciones = models.ManyToManyField(TransaccionPago, related_name='suscripciones', blank=True)

    def __str__(self):
        return self.miembro.perfil.usuario.username
