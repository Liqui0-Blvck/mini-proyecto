import { TMaquina } from "../maquinas/maquinas.type";

export type TEjercicio = {
  id?: number
  gimnasio: number;
  maquina?: TMaquina | null;
  nombre: string;
  descripcion: string;
  categoria: string;
  subcategoria: string;
  duracion_estimado: string | null;
  dificultad: string;
  video_instructivo: string | null;
  grupo_muscular?: string;
}