from django.db import models
from django.conf import settings
from .options import *
from core.models import *
from .functions import *

class Gimnasio(BaseModel):
  nombre = models.CharField(max_length=100)
  direccion = models.TextField()
  telefono = models.CharField(max_length=15)
  logo = models.ImageField(upload_to=ruta_logo, blank=True, null=True)
  email = models.EmailField(blank=True, null=True)
  sitio_web = models.URLField(blank=True, null=True)

  def __str__(self):
      return self.nombre
      
      
class Sucursal(BaseModel):
  nombre = models.CharField(max_length=100)
  gimnasio = models.ForeignKey(Gimnasio, on_delete=models.CASCADE, related_name='sucursales')
  direccion = models.TextField()
  telefono = models.CharField(max_length=15)
  horario_apertura = models.TimeField()
  horario_cierre = models.TimeField()

  def __str__(self):
      return f'Sucursal de {self.gimnasio.nombre}'
    
  



class Staff(BaseHistoricalModel):
  perfil = models.OneToOneField('cuentas.Perfil', on_delete=models.CASCADE)
  gimnasio = models.ForeignKey(Gimnasio, on_delete=models.CASCADE)
  sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE, related_name='staff')  # Nueva relación
  fecha_contratacion = models.DateTimeField(auto_now_add=True)
  especialidades = models.TextField(blank=True)
  certificaciones = models.TextField(blank=True)
  evaluaciones_desempeno = models.JSONField(blank=True, null=True)
  notas_supervisores = models.TextField(blank=True)

  def __str__(self):
      return self.perfil.usuario.username



class HorarioTrabajo(models.Model):
  staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='horarios')
  hora_inicio = models.DateTimeField()
  hora_fin = models.DateTimeField()

  def __str__(self):
      return f'{self.staff.nombre} - {self.hora_inicio} - {self.hora_fin}'
    
    
    
  