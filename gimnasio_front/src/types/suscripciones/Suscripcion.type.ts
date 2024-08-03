export type TSuscripcionUsuario = {
  miembro: number;
  tipo_membresia: string;
  fecha_inicio: string | null;
  fecha_expiracion: string | null;
  activa: boolean;
  transacciones: number[];
};