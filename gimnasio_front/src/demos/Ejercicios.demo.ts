import { IHistoriaEjercicios } from "../pages/Miembros/Detalle Miembros/Historial Ejercicios/TablaHistoricaEjercicio.table";

// Ejemplo de datos para IHistoriaEjercicios
export const historiaEjercicios: IHistoriaEjercicios[] = [
  {
      ejercicios: {
          gimnasio: 1,
          nombre: 'Press de Banca',
          descripcion: 'Máquina para ejercicios de pecho y tríceps.',
          categoria: 'Pecho',
          subcategoria: 'Press',
          duracion_estimado: '00:30:00',
          dificultad: 'Intermedio',
          video_instructivo: 'press_banca.mp4',
          grupo_muscular: 'chest'
      },
      fecha_creacion: '2024-09-01',
      hora_entrada: '09:00',
      hora_salida: '09:30',
      duracion: '00:30:00'
  },
  {
      ejercicios: {
          gimnasio: 1,
          nombre: 'Sentadillas',
          descripcion: 'Ejercicio para trabajar las piernas.',
          categoria: 'Piernas',
          subcategoria: 'Sentadillas',
          duracion_estimado: '00:20:00',
          dificultad: 'Avanzado',
          video_instructivo: 'sentadillas.mp4',
          grupo_muscular: 'quads'
      },
      fecha_creacion: '2024-09-01',
      hora_entrada: '10:00',
      hora_salida: '10:20',
      duracion: '00:20:00'
  },
  {
      ejercicios: {
          gimnasio: 1,
          nombre: 'Remo con Barra',
          descripcion: 'Ejercicio para entrenar la espalda.',
          categoria: 'Espalda',
          subcategoria: 'Remo',
          duracion_estimado: '00:25:00',
          dificultad: 'Intermedio',
          video_instructivo: 'remo_barra.mp4',
          grupo_muscular: 'lats'
      },
      fecha_creacion: '2024-09-02',
      hora_entrada: '11:00',
      hora_salida: '11:25',
      duracion: '00:25:00'
  },
  {
      ejercicios: {
          gimnasio: 1,
          nombre: 'Curl de Bíceps',
          descripcion: 'Ejercicio para desarrollar los bíceps.',
          categoria: 'Bíceps',
          subcategoria: 'Curl',
          duracion_estimado: '00:15:00',
          dificultad: 'Principiante',
          video_instructivo: 'curl_biceps.mp4',
          grupo_muscular: 'biceps'
      },
      fecha_creacion: '2024-09-02',
      hora_entrada: '12:00',
      hora_salida: '12:15',
      duracion: '00:15:00'
  },
  {
      ejercicios: {
          gimnasio: 1,
          nombre: 'Abdominales',
          descripcion: 'Ejercicio para trabajar los abdominales.',
          categoria: 'Abdomen',
          subcategoria: 'Crunches',
          duracion_estimado: '00:10:00',
          dificultad: 'Principiante',
          video_instructivo: 'abdominales.mp4',
          grupo_muscular: 'abdominals'
      },
      fecha_creacion: '2024-09-03',
      hora_entrada: '08:00',
      hora_salida: '08:10',
      duracion: '00:10:00'
  },
  {
      ejercicios: {
          gimnasio: 1,
          nombre: 'Elevación de Talones',
          descripcion: 'Ejercicio para trabajar los gemelos.',
          categoria: 'Piernas',
          subcategoria: 'Elevación',
          duracion_estimado: '00:15:00',
          dificultad: 'Intermedio',
          video_instructivo: 'elevacion_talones.mp4',
          grupo_muscular: 'calves'
      },
      fecha_creacion: '2024-09-03',
      hora_entrada: '08:15',
      hora_salida: '08:30',
      duracion: '00:15:00'
  },
  {
      ejercicios: {
          gimnasio: 1,
          nombre: 'Press Militar',
          descripcion: 'Ejercicio para los hombros y tríceps.',
          categoria: 'Hombros',
          subcategoria: 'Press',
          duracion_estimado: '00:20:00',
          dificultad: 'Avanzado',
          video_instructivo: 'press_militar.mp4',
          grupo_muscular: 'front-shoulders'
      },
      fecha_creacion: '2024-09-04',
      hora_entrada: '09:00',
      hora_salida: '09:20',
      duracion: '00:20:00'
  },
  {
      ejercicios: {
          gimnasio: 1,
          nombre: 'Flexora de Piernas',
          descripcion: 'Ejercicio para trabajar los isquiotibiales.',
          categoria: 'Piernas',
          subcategoria: 'Flexión',
          duracion_estimado: '00:15:00',
          dificultad: 'Intermedio',
          video_instructivo: 'flexora_piernas.mp4',
          grupo_muscular: 'hamstrings'
      },
      fecha_creacion: '2024-09-04',
      hora_entrada: '09:30',
      hora_salida: '09:45',
      duracion: '00:15:00'
  },
  {
      ejercicios: {
          gimnasio: 1,
          nombre: 'Pull-over',
          descripcion: 'Ejercicio para la espalda y el pecho.',
          categoria: 'Espalda',
          subcategoria: 'Pull-over',
          duracion_estimado: '00:20:00',
          dificultad: 'Avanzado',
          video_instructivo: 'pullover.mp4',
          grupo_muscular: 'lats'
      },
      fecha_creacion: '2024-09-05',
      hora_entrada: '10:00',
      hora_salida: '10:20',
      duracion: '00:20:00'
  },
  {
      ejercicios: {
          gimnasio: 1,
          nombre: 'Abductores',
          descripcion: 'Ejercicio para los abductores de las piernas.',
          categoria: 'Piernas',
          subcategoria: 'Abducción',
          duracion_estimado: '00:15:00',
          dificultad: 'Principiante',
          video_instructivo: 'abductores.mp4',
          grupo_muscular: 'glutes'
      },
      fecha_creacion: '2024-09-05',
      hora_entrada: '10:30',
      hora_salida: '10:45',
      duracion: '00:15:00'
  },
  {
      ejercicios: {
          gimnasio: 1,
          nombre: 'Extensiones de Tríceps',
          descripcion: 'Ejercicio para trabajar los tríceps.',
          categoria: 'Tríceps',
          subcategoria: 'Extensión',
          duracion_estimado: '00:10:00',
          dificultad: 'Principiante',
          video_instructivo: 'extensiones_triceps.mp4',
          grupo_muscular: 'triceps'
      },
      fecha_creacion: '2024-09-06',
      hora_entrada: '11:00',
      hora_salida: '11:10',
      duracion: '00:10:00'
  },
  {
      ejercicios: {
          gimnasio: 1,
          nombre: 'Encogimientos de Hombros',
          descripcion: 'Ejercicio para los trapecios.',
          categoria: 'Hombros',
          subcategoria: 'Encogimientos',
          duracion_estimado: '00:15:00',
          dificultad: 'Intermedio',
          video_instructivo: 'encogimientos_hombros.mp4',
          grupo_muscular: 'traps'
      },
      fecha_creacion: '2024-09-06',
      hora_entrada: '11:30',
      hora_salida: '11:45',
      duracion: '00:15:00'
  },
  {
      ejercicios: {
          gimnasio: 1,
          nombre: 'Plancha',
          descripcion: 'Ejercicio para el core.',
          categoria: 'Core',
          subcategoria: 'Plancha',
          duracion_estimado: '00:05:00',
          dificultad: 'Principiante',
          video_instructivo: 'plancha.mp4',
          grupo_muscular: 'abdominals'
      },
      fecha_creacion: '2024-09-07',
      hora_entrada: '12:00',
      hora_salida: '12:05',
      duracion: '00:05:00'
  }
];
