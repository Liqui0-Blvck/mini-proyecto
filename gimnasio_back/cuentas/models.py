from django.db import models
from core.models import *
from cuentas.options import *
from django.conf import settings
from .functions import *



class Perfil(models.Model):
    gimnasio = models.ForeignKey('gimnasios.Gimnasio', on_delete=models.CASCADE)
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='informacion')
    fecha_nacimiento = models.DateField(null=True, blank=True)
    genero = models.CharField(max_length=30, choices=GENDERS, null=True, blank=True)
    direccion = models.TextField(blank=True)
    numero_telefono = models.CharField(max_length=20, blank=True)
    imagen_perfil = models.ImageField(upload_to=ruta_imagen, blank=True, null=True)
    enlace_redes_sociales = models.URLField(blank=True)

    def __str__(self):
        return self.usuario.first_name
    
class ConfiguracionUsuario(models.Model):
    gimnasio = models.ForeignKey('gimnasios.Gimnasio', on_delete=models.CASCADE)
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='configuracion')
    idioma_preferido = models.CharField(max_length=20, blank=True)
    configuraciones_notificaciones = models.BooleanField(default=True)
    configuraciones_privacidad = models.BooleanField(default=True)
    estilo_aplicacion = models.CharField(max_length=20, choices=DARK_MODE, default='light')
    color_aplicacion = models.CharField(max_length=20, choices=COLOR_CHOICES, default='white')
    fuente_aplicacion = models.CharField(max_length=50, choices=FONT_CHOICES, default='Arial, sans-serif')

    def __str__(self):
        return self.usuario.first_name
    
class InteresesUsuario(BaseHistoricalModel):
    gimnasio = models.ForeignKey('gimnasios.Gimnasio', on_delete=models.CASCADE)
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='intereses')
    preferencias_entrenamiento = models.TextField(blank=True)
    metas_fitness = models.TextField(blank=True)
    preferencias_gimnasio = models.TextField(blank=True)
