
from django.db import models
from core.models import *
from .options import *
import uuid


class Miembro(BaseHistoricalModel):
    uid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    perfil = models.OneToOneField('cuentas.Perfil', on_delete=models.CASCADE)
    gimnasio = models.ForeignKey('gimnasios.Gimnasio', on_delete=models.CASCADE)
    sucursal = models.ForeignKey('gimnasios.Sucursal', on_delete=models.CASCADE, related_name='miembros')
    fecha_inscripcion = models.DateTimeField(auto_now_add=True)
    estado_membresia = models.CharField(max_length=20, choices=ESTADOS_MEMBRESIA, default='pendiente')
    preferencias_entrenamiento = models.JSONField(default=dict, blank=True)
    objetivos_personales = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return self.perfil.usuario.first_name


class AsistenciaMiembro(BaseHistoricalModel):
    uid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    miembro = models.ForeignKey('miembros.Miembro', on_delete=models.CASCADE)
    hora_entrada = models.TimeField()
    hora_salida = models.TimeField(blank=True, null=True)
    notas = models.TextField(blank=True)
    sucursal = models.ForeignKey('gimnasios.Sucursal', on_delete=models.CASCADE)

    def __str__(self):
        return f'Asistencia de {self.miembro.perfil.usuario.first_name} en {self.sucursal} el {self.fecha_creacion}'


class SeguimientoPeso(BaseHistoricalModel):
    uid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    miembro = models.ForeignKey('miembros.Miembro', on_delete=models.CASCADE, related_name='seguimientos')
    peso = models.DecimalField(max_digits=5, decimal_places=2)
    comentarios = models.TextField(blank=True)

    def __str__(self):
        return f'Seguimiento de {self.miembro.perfil.usuario.first_name} - {self.peso} kg'


class EvaluacionesFisicas(BaseHistoricalModel):
    uid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    miembro = models.ForeignKey('miembros.Miembro', on_delete=models.CASCADE, related_name='evaluaciones')
    peso = models.DecimalField(max_digits=5, decimal_places=2)
    altura = models.DecimalField(max_digits=5, decimal_places=2)
    imc = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f'Evaluación de {self.miembro.perfil.usuario.first_name} - {self.fecha_creacion}'


class MetasPersonales(BaseHistoricalModel):
    uid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    miembro = models.ForeignKey('miembros.Miembro', on_delete=models.CASCADE, related_name='metas')
    descripcion = models.TextField()
    fecha_objetivo = models.DateField()
    progreso = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)

    def __str__(self):
        return f'Meta de {self.miembro.perfil.usuario.first_name}: {self.descripcion}'

  
