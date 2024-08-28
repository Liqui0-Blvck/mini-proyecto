export type TGimnasio = {
  id: number
  dueno: number
  nombre: string
  direccion: string
  ciudad: string
  estado: string
  telefono: string
  logo: string
  activo: boolean
  email: string
  sitio_web: string
  fecha_modificacion: string
}

export type TSucursal = {
  id: number
  nombre: string
  gimnasio: number
  direccion: string
  telefono: string
  horario_apertura: string
  horario_cierre: string
  fecha_modificacion: string
  fecha_creacion: string
}