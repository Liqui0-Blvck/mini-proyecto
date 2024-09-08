from django.db import models
from core.models import *
from .options import *
from .functions import *


class Maquina(models.Model):
    gimnasio = models.ForeignKey('gimnasios.Gimnasio', on_delete=models.CASCADE, related_name='maquinas')
    nombre = models.CharField(max_length=100)  # Nombre de la máquina
    descripcion = models.TextField(blank=True)  # Descripción de la máquina
    imagen = models.ImageField(upload_to='imagenes_maquinas/', blank=True)  # Imagen de la máquina
    grupo_muscular = models.CharField(max_length=100, choices=GRUPOS_MUSCULARES, blank=True)

    def __str__(self):
        return self.nombre

class Ejercicio(models.Model):
    gimnasio = models.ForeignKey('gimnasios.Gimnasio', on_delete=models.CASCADE)
    maquina = models.ForeignKey(Maquina, on_delete=models.SET_NULL, null=True, blank=True, related_name='ejercicios')  # Relación con la máquina
    nombre = models.CharField(max_length=100)  # Nombre del ejercicio
    descripcion = models.TextField(blank=True)  # Descripción del ejercicio
    categoria = models.CharField(max_length=50, choices=CATEGORIAS_EJERCICIO)
    subcategoria = models.CharField(max_length=50)
    duracion_estimado = models.DurationField(blank=True, null=True)  # Duración estimada del ejercicio
    dificultad = models.CharField(max_length=20, choices=DIFICULTADES, default='principiante')
    video_instructivo = models.FileField(upload_to=ruta_video, blank=True, null=True)
    grupo_muscular = models.CharField(max_length=100, choices=GRUPOS_MUSCULARES, blank=True)

    def __str__(self):
        return self.nombre


class Rutina(BaseModel):
    gimnasio = models.ForeignKey('gimnasios.Gimnasio', on_delete=models.CASCADE, related_name='rutina')
    nombre = models.CharField(max_length=100)  # Nombre de la rutina
    miembro = models.ForeignKey('miembros.Miembro', on_delete=models.CASCADE, related_name='rutinas')  # Miembro asociado
    entrenador = models.ForeignKey('gimnasios.Staff', on_delete=models.SET_NULL, null=True, blank=True, related_name='rutinas')  # Entrenador responsable
    duracion_total = models.DurationField(blank=True, null=True)  # Duración total de la rutina
    dias_semanales = models.JSONField(default=list)  # Días de la semana en que se realiza la rutina
    objetivos = models.TextField(blank=True)  # Objetivos específicos de la rutina
    dificultad = models.CharField(max_length=20, choices=DIFICULTADES, default='principiante')
    comentarios = models.TextField(blank=True)  # Notas adicionales sobre la rutina
    ejercicios = models.ManyToManyField(Ejercicio, through='EjercicioRutina')

    def __str__(self):
        return self.nombre

class EjercicioRutina(BaseModel):
    rutina = models.ForeignKey(Rutina, on_delete=models.CASCADE)
    ejercicio = models.ForeignKey(Ejercicio, on_delete=models.CASCADE)
    repeticiones = models.IntegerField(blank=True, null=True)
    series = models.IntegerField(blank=True, null=True)
    peso = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    descanso = models.DurationField(blank=True, null=True)

    def __str__(self):
        return f'{self.ejercicio.nombre} en {self.rutina.nombre}'
    

class SesionEntrenamiento(BaseModel):
    miembro = models.ForeignKey('miembros.Miembro', on_delete=models.CASCADE, related_name='sesiones')
    rutina = models.ForeignKey(Rutina, on_delete=models.CASCADE, related_name='sesiones')
    ejercicios_realizados = models.ManyToManyField(Ejercicio, through='EjercicioRealizado', related_name='sesiones')

    def __str__(self):
        return f'Sesión de {self.miembro.perfil.usuario.username} - {self.fecha_creacion}'
    


class EjercicioRealizado(models.Model):
    sesion = models.ForeignKey(SesionEntrenamiento, on_delete=models.CASCADE)
    ejercicio = models.ForeignKey(Ejercicio, on_delete=models.CASCADE)
    repeticiones = models.IntegerField(blank=True, null=True)  # Número de repeticiones realizadas
    series = models.IntegerField(blank=True, null=True)  # Número de series realizadas
    peso = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  # Peso utilizado en el ejercicio
    tiempo_inicial = models.DateTimeField(null=True, blank=True)
    tiempo_final = models.DateTimeField(null=True, blank=True)
    estado_ejercicio = models.CharField(max_length=20, choices=ESTADOS_EJERCICIO, default='espera')
    
    def __str__(self):
        return f'Ejercicio: {self.ejercicio.nombre} en {self.sesion.fecha_creacion}'
    

class Descanso(models.Model):
    sesion = models.ForeignKey(SesionEntrenamiento, on_delete=models.CASCADE, related_name='descansos')
    tiempo = models.DurationField()  # Tiempo de descanso
    orden = models.PositiveIntegerField()  # Orden en el que se registró el descanso
    ejercicio_realizado = models.ForeignKey(EjercicioRealizado, on_delete=models.CASCADE, related_name='descansos')

    def __str__(self):
        return f'Descanso de {self.sesion.miembro.perfil.usuario.username} - {self.tiempo}'