from django.db import models
from django.conf import settings
from .options import *
from core.models import *
from .functions import *

class Gimnasio(BaseModel):
  dueno = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='gimnasios')
  nombre = models.CharField(max_length=100)
  direccion = models.TextField()
  ciudad = models.CharField(max_length=50, blank=True)
  estado = models.CharField(max_length=50, blank=True)
  telefono = models.CharField(max_length=15)
  logo = models.ImageField(upload_to=ruta_logo, blank=True, null=True)
  activo = models.BooleanField(default=False)
  email = models.EmailField(blank=True, null=True)
  sitio_web = models.URLField(blank=True, null=True)

  class Meta:
    ordering = ['-fecha_creacion']

  def __str__(self):
      return self.nombre
    

      
class Sucursal(BaseModel):
  nombre = models.CharField(max_length=100)
  gimnasio = models.ForeignKey('gimnasios.Gimnasio', on_delete=models.CASCADE, related_name='sucursales')
  direccion = models.TextField()
  telefono = models.CharField(max_length=15)
  activo = models.BooleanField(default=False)
  horario_apertura = models.TimeField(null = True, blank = True)
  horario_cierre = models.TimeField(null = True, blank = True)

  def __str__(self):
      return f'Sucursal de {self.gimnasio.nombre}'

    

class Staff(BaseHistoricalModel):
  perfil = models.OneToOneField('cuentas.Perfil', on_delete=models.CASCADE)
  gimnasio = models.ForeignKey('gimnasios.Gimnasio', on_delete=models.CASCADE)
  sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE, related_name='staff')
  fecha_contratacion = models.DateTimeField(auto_now_add=True)
  especialidades = models.TextField(blank=True)
  certificaciones = models.TextField(blank=True)
  evaluaciones_desempeno = models.JSONField(blank=True, null=True)
  notas_supervisores = models.TextField(blank=True)
  cargo = models.CharField(max_length=100, blank=True)  # Añadir el campo de cargo

  def __str__(self):
      return self.perfil.usuario.first_name




class HorarioTrabajo(models.Model):
  staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='horarios')
  sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE, related_name='horarios')  # Añadir sucursal
  hora_inicio = models.DateTimeField()
  hora_fin = models.DateTimeField()

  def __str__(self):
      return f'{self.staff.perfil.usuario.first_name} - {self.hora_inicio} - {self.hora_fin}'

    
    
    
  