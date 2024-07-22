# en tu_app/models.py


from django.db import models
from core.models import *
from cuentas.options import *
from django.conf import settings
from .functions import *



class Perfil(models.Model):
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='informacion')
    fecha_nacimiento = models.DateField(null=True, blank=True)
    genero = models.CharField(max_length=30, choices=GENDERS, null=True, blank=True)
    direccion = models.TextField(blank=True)
    numero_telefono = models.CharField(max_length=20, blank=True)
    imagen_perfil = models.ImageField(upload_to=ruta_imagen, blank=True, null=True, validators=[validar_imagen])
    enlace_redes_sociales = models.URLField(blank=True)

    def __str__(self):
        return self.usuario.first_name
    
class ConfiguracionUsuario(models.Model):
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='configuracion')
    idioma_preferido = models.CharField(max_length=20, blank=True)
    configuraciones_notificaciones = models.BooleanField(default=True)
    configuraciones_privacidad = models.BooleanField(default=True)
    estilo_aplicacion = models.CharField(max_length=20, choices=DARK_MODE, default='light')
    color_aplicacion = models.CharField(max_length=20, choices=COLOR_CHOICES, default='white')
    fuente_aplicacion = models.CharField(max_length=50, choices=FONT_CHOICES, default='Arial, sans-serif')

    def __str__(self):
        return self.usuario.first_name
    

class Actividad(BaseModel):
    nombre = models.CharField(max_length=100)
    tipo_actividad = models.CharField(max_length=100)  # Tipo específico de actividad (inicio de sesión, perfil modificado, etc.)
    resultado_actividad = models.CharField(max_length=100, blank=True)  # Resultado de la actividad (éxito, falla, etc.)
    duracion_actividad = models.DurationField(blank=True, null=True)  # Duración de la actividad
    

    def __str__(self):
        return self.nombre

class RegistroActividad(BaseHistoricalModel):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    actividad = models.ForeignKey(Actividad, on_delete=models.CASCADE)
    detalles_actividad = models.TextField(blank=True)  # Detalles adicionales sobre la actividad
    dispositivo_plataforma = models.CharField(max_length=100, blank=True)  # Dispositivo o plataforma desde donde se realizó la actividad
    ubicacion = models.CharField(max_length=255, blank=True)  # Ubicación desde donde se realizó la actividad
    ip_usuario = models.CharField(max_length=50, blank=True)  # Dirección IP del usuario
    usuario_responsable = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='actividades_realizadas', null=True, blank=True)  # Usuario responsable de la actividad (puede ser diferente del usuario principal)
    notas = models.TextField(blank=True)  # Notas o comentarios adicionales sobre la actividad

    def __str__(self):
        return f'{self.usuario.username} - {self.actividad.nombre}'
    
class InteresesUsuario(BaseHistoricalModel):
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='intereses')
    preferencias_entrenamiento = models.TextField(blank=True)
    metas_fitness = models.TextField(blank=True)
    preferencias_gimnasio = models.TextField(blank=True)
