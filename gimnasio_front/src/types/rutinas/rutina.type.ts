export type TRutina = {
  gimnasio: number;
  nombre: string;
  miembro: number;
  entrenador: number | null;
  duracion_total: string | null;
  dias_semanales: string[];
  objetivos: string;
  dificultad: string;
  comentarios: string;
  ejercicios: number[];
};