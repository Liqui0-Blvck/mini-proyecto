import { IHistoriaEjercicios } from "../pages/Miembros/Detalle Miembros/Historial Ejercicios/TablaHistoricaEjercicio.table";
import { TEjercicio } from "../types/ejercicios/ejercicios.type";

// Ejemplo de datos para IHistoriaEjercicios
export const historiaEjercicios: IHistoriaEjercicios[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
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


export const ejercicios: TEjercicio[] = [
    {
      id: 1,
      gimnasio: 1,
      maquina: {
        id: 1,
        gimnasio: 1,
        nombre: "Cinta de Correr",
        descripcion: "Máquina para correr o caminar a velocidad variable.",
        imagen: null,
        grupo_muscular: 'quads'
      },
      nombre: "Running",
      descripcion: "Ejercicio cardiovascular para mejorar resistencia.",
      categoria: "cardio",
      subcategoria: "aeróbico",
      duracion_estimado: "00:30:00",
      dificultad: "intermedio",
      video_instructivo: "/videos/running.mp4",
      grupo_muscular: "quads"
    },
    {
      id: 2,
      gimnasio: 2,
      maquina: null,
      nombre: "Push-Ups",
      descripcion: "Ejercicio de peso corporal para fortalecer el pecho y los brazos.",
      categoria: "fuerza",
      subcategoria: "pecho",
      duracion_estimado: "00:01:00",
      dificultad: "principiante",
      video_instructivo: "/videos/push_ups.mp4",
      grupo_muscular: "pectoral"
    },
    {
      id: 3,
      gimnasio: 1,
      maquina: {
        id: 2,
        gimnasio: 1,
        nombre: "Bicicleta Estática",
        descripcion: "Máquina para realizar ejercicio cardiovascular de bajo impacto.",
        imagen: null,
        grupo_muscular: 'full body'

      },
      nombre: "Cycling",
      descripcion: "Ejercicio cardiovascular que mejora resistencia y quema grasa.",
      categoria: "cardio",
      subcategoria: "aeróbico",
      duracion_estimado: "00:45:00",
      dificultad: "avanzado",
      video_instructivo: "/videos/cycling.mp4",
      grupo_muscular: "full body"
    },
    {
      id: 4,
      gimnasio: 3,
      maquina: null,
      nombre: "Squats",
      descripcion: "Ejercicio compuesto para fortalecer las piernas y glúteos.",
      categoria: "fuerza",
      subcategoria: "piernas",
      duracion_estimado: "00:02:00",
      dificultad: "intermedio",
      video_instructivo: "/videos/squats.mp4",
      grupo_muscular: "glutes"
    },
    {
      id: 5,
      gimnasio: 4,
      maquina: {
        id: 3,
        gimnasio: 4,
        nombre: "Smith Machine",
        descripcion: "Máquina guiada para realizar ejercicios con barra de forma segura.",
        imagen: null,
        grupo_muscular: 'full body'
      },
      nombre: "Smith Machine Bench Press",
      descripcion: "Ejercicio de fuerza para el pecho utilizando la Smith Machine.",
      categoria: "fuerza",
      subcategoria: "pecho",
      duracion_estimado: "00:01:30",
      dificultad: "avanzado",
      video_instructivo: "/videos/smith_machine_bench_press.mp4",
      grupo_muscular: "pectorales"
    },
    {
      id: 6,
      gimnasio: 2,
      maquina: null,
      nombre: "Plank",
      descripcion: "Ejercicio de estabilización para fortalecer el core.",
      categoria: "resistencia",
      subcategoria: "core",
      duracion_estimado: "00:03:00",
      dificultad: "intermedio",
      video_instructivo: "/videos/plank.mp4",
      grupo_muscular: "core"
    },
    {
      id: 7,
      gimnasio: 3,
      maquina: {
        id: 4,
        gimnasio: 3,
        nombre: "Leg Press",
        descripcion: "Máquina para ejercitar los cuádriceps y glúteos.",
        imagen: null,
        grupo_muscular: 'glutes'
      },
      nombre: "Leg Press",
      descripcion: "Ejercicio de fuerza para desarrollar los cuádriceps.",
      categoria: "fuerza",
      subcategoria: "piernas",
      duracion_estimado: "00:01:20",
      dificultad: "intermedio",
      video_instructivo: "/videos/leg_press.mp4",
      grupo_muscular: "piernas"
    },
    {
      id: 8,
      gimnasio: 1,
      maquina: {
        id: 5,
        gimnasio: 1,
        nombre: "Pull-Up Bar",
        descripcion: "Barra fija para realizar ejercicios de tracción.",
        imagen: null,
        grupo_muscular: 'back'
      },
      nombre: "Pull-Ups",
      descripcion: "Ejercicio para fortalecer la espalda y los brazos.",
      categoria: "fuerza",
      subcategoria: "espalda",
      duracion_estimado: "00:01:00",
      dificultad: "avanzado",
      video_instructivo: "/videos/pull_ups.mp4",
      grupo_muscular: "espalda"
    },
    {
      id: 9,
      gimnasio: 4,
      maquina: {
        id: 6,
        gimnasio: 4,
        nombre: "Cuerda de Batalla",
        descripcion: "Cuerdas pesadas para ejercicios de alta intensidad.",
        imagen: null,
        grupo_muscular: 'full body'
      },
      nombre: "Battle Ropes",
      descripcion: "Ejercicio de alta intensidad para todo el cuerpo.",
      categoria: "cardio",
      subcategoria: "full body",
      duracion_estimado: "00:01:30",
      dificultad: "avanzado",
      video_instructivo: "/videos/battle_ropes.mp4",
      grupo_muscular: "full body"
    },
    {
      id: 10,
      gimnasio: 5,
      maquina: null,
      nombre: "Jumping Jacks",
      descripcion: "Ejercicio aeróbico para calentar y mejorar la coordinación.",
      categoria: "cardio",
      subcategoria: "aeróbico",
      duracion_estimado: "00:01:00",
      dificultad: "principiante",
      video_instructivo: "/videos/jumping_jacks.mp4",
      grupo_muscular: "full body"
    }
  ];
   