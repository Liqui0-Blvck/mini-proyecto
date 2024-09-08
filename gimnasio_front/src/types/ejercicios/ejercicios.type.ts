export type TEjercicio = {
  gimnasio: number;
  maquina?: string | null;
  nombre: string;
  descripcion: string;
  categoria: string;
  subcategoria: string;
  duracion_estimado: string | null;
  dificultad: string;
  video_instructivo: string | null;
  grupo_muscular: string;
}