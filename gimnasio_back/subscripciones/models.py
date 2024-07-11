# En subscripciones/models.py

from django.db import models
from django.conf import settings
from subscripciones.options import ESTADOS_PAGO


class TransaccionPago(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    cantidad = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_transaccion = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=ESTADOS_PAGO)

    def __str__(self):
        return f'Transacción de {self.usuario.username} - {self.cantidad}'

    class Meta:
        ordering = ['-fecha_transaccion']

class SuscripcionUsuario(models.Model):
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='suscripcion')
    tipo_membresia = models.CharField(max_length=50, blank=True)
    estado_pago = models.CharField(max_length=20, choices=ESTADOS_PAGO, default='pendiente')
    transacciones = models.ManyToManyField(TransaccionPago, related_name='suscripciones', blank=True)

    def __str__(self):
        return self.usuario.username
