import { TPerfil } from "../core/core.types";

export enum EstadosMembresia {
  Activo = "Activo",
  Inactivo = "Inactivo"
}

interface TPreferenciasEntrenamiento {
  objetivo_entrenamiento: string
  tipo_entrenamiento_preferido: string
  frecuencia_entrenamiento: string
  intensidad_entrenamiento: string
  duracion_entrenamiento: string
  horario_entrenamiento: string
}

export interface IAsistencia {
  duracion: string
  hora_entrada: string
  hora_salida: string
  fecha_creacion: string
}



interface TObjetivosPersonales {
  peso?: string;
  musculatura?: string;
  flexibilidad?: string;
  estrés?: string;
  resistencia?: string;
  postura?: string;
  fuerza?: string;
  técnica?: string;
  diversión?: string;
}

export interface TMiembro {
  id: number
  uid: string
  activo: boolean
  perfil: TPerfil;
  gimnasio: number;
  sucursal: number;
  fecha_inscripcion: string; // ISO string format for date
  estado_membresia: EstadosMembresia;
  preferencias_entrenamiento: TPreferenciasEntrenamiento;
  objetivos_personales: TObjetivosPersonales;
}