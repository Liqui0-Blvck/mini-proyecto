from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from cuentas.models import *

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def crear_perfil_usuario(sender, instance, created, **kwargs):
    if created:
        Perfil.objects.create(usuario=instance)
        ConfiguracionUsuario.objects.create(
            usuario = instance,
            idioma_preferido = 'es',
            configuraciones_notificaciones = True,
            configuraciones_privacidad = True,
            estilo_aplicacion = 'dark',
            color_aplicacion = 'zinc',
            fuente_aplicacion = 'Roboto, sans-serif'
        )