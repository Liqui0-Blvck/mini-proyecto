from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from cuentas.models import *
from gimnasios.models import *
from django.contrib.auth.signals import user_logged_in
from django.http import HttpResponse

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def crear_perfil_usuario(sender, instance, created, **kwargs):
    if created:
        gimnasio = Gimnasio.objects.create(dueno = instance, activo = True)
        Perfil.objects.create(usuario=instance, gimnasio = gimnasio)
        ConfiguracionUsuario.objects.create(
            usuario = instance,
            idioma_preferido = 'es',
            configuraciones_notificaciones = True,
            configuraciones_privacidad = True,
            estilo_aplicacion = 'dark',
            color_aplicacion = 'zinc',
            fuente_aplicacion = 'Roboto, sans-serif',
            gimnasio = gimnasio
        )
        Sucursal.objects.create(gimnasio = gimnasio, activo = True)
        instance.dueno = True
        instance.is_staff = True
        instance.save()
