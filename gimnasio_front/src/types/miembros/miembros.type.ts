export enum EstadosMembresia {
  Activo = "Activo",
  Inactivo = "Inactivo"
}

interface PreferenciasEntrenamiento {
  tipo: string;
  frecuencia: string;
}

interface ObjetivosPersonales {
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

export interface Miembro {
  perfil: number;
  gimnasio: number;
  sucursal: number;
  fecha_inscripcion: string; // ISO string format for date
  estado_membresia: EstadosMembresia;
  preferencias_entrenamiento: PreferenciasEntrenamiento;
  objetivos_personales: ObjetivosPersonales;
}