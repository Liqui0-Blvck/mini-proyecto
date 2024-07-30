
from django.db import models
from core.models import *
from .options import *


class Miembro(BaseHistoricalModel):
  perfil = models.OneToOneField('cuentas.Perfil', on_delete=models.CASCADE)
  gimnasio = models.ForeignKey('gimnasios.Gimnasio', on_delete=models.CASCADE)
  sucursal = models.ForeignKey('gimnasios.Sucursal', on_delete=models.CASCADE, related_name='miembros')  # Nueva relación
  fecha_inscripcion = models.DateTimeField(auto_now_add=True)
  estado_membresia = models.CharField(max_length=20, choices=ESTADOS_MEMBRESIA)
  preferencias_entrenamiento = models.JSONField(default=dict, blank=True)
  objetivos_personales = models.JSONField(default=dict, blank=True)

  def __str__(self):
      return self.perfil.usuario.first_name
  
  
class AsistenciaMiembro(BaseHistoricalModel):
    miembro = models.ForeignKey('miembros.Miembro', on_delete=models.CASCADE)
    hora_entrada = models.TimeField()  # Hora de entrada
    hora_salida = models.TimeField(blank=True, null=True)  # Hora de salida (opcional)
    notas = models.TextField(blank=True)  # Notas adicionales
    sucursal = models.ForeignKey('gimnasios.Sucursal', on_delete=models.CASCADE)  # Obligatorio

    def __str__(self):
        return f'Asistencia de {self.miembro.perfil.usuario.first_name} en {self.sucursal} el {self.fecha_creacion}'


class SeguimientoPeso(BaseHistoricalModel):
    miembro = models.ForeignKey('miembros.Miembro', on_delete=models.CASCADE, related_name='seguimientos')
    peso = models.DecimalField(max_digits=5, decimal_places=2)
    comentarios = models.TextField(blank=True)

    def __str__(self):
      return f'Seguimiento de {self.miembro.perfil.usuario.first_name} - {self.peso} kg' 
    
class EvaluacionesFisicas(BaseHistoricalModel):
    miembro = models.ForeignKey('miembros.Miembro', on_delete=models.CASCADE, related_name='evaluaciones')
    peso = models.DecimalField(max_digits=5, decimal_places=2)  # Peso en la evaluación
    altura = models.DecimalField(max_digits=5, decimal_places=2)  # Altura en la evaluación
    imc = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)  # Índice de masa corporal

    def __str__(self):
        return f'Evaluación de {self.miembro.perfil.usuario.first_name} - {self.fecha_creacion}'

class MetasPersonales(BaseHistoricalModel):
    miembro = models.ForeignKey('miembros.Miembro', on_delete=models.CASCADE, related_name='metas')
    descripcion = models.TextField()  # Descripción de la meta
    fecha_objetivo = models.DateField()  # Fecha límite para alcanzar la meta
    progreso = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)  # Progreso de la meta (porcentaje)

    def __str__(self):
        return f'Meta de {self.miembro.perfil.usuario.first_name}: {self.descripcion}'

  
