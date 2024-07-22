export type AuthTokens = {
  access: string | null 
  refresh: string | null
}

export type TPerfil = {
  id: number
  usuario: {
    id: number
    email: string
    first_name: string
    second_name: string
    father_last_name: string
    mother_last_name: string
    is_staff: boolean,
    is_active: boolean,
    date_joined: string,
    groups: [],
    user_permissions: []
  }
  fecha_nacimiento: string
  genero: string
  direccion: string
  numero_telefono: string
  imagen_perfil: string
  enlace_redes_sociales: string
}


export type TConfiguracion = {
  idioma_preferido: string
  configuraciones_notificaciones: string
  configuraciones_privacidad: string
  estilo_aplicacion: string
  color_aplicacion: string
  fuente_aplicacion: string
}