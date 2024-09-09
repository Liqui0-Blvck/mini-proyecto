import { SuscripcionUsuario } from "../types/suscripciones/Suscripcion.type";
import { transacciones } from "./Transacciones.demo";

export const suscripcion: SuscripcionUsuario = {
  id: 1,
  miembro: 1,
  tipo_membresia: 'Premium', // Ejemplo de tipo de membresía
  fecha_inicio: '2024-09-01T00:00:00Z',
  fecha_expiracion: '2025-09-01T00:00:00Z',
  activa: true,
  transacciones: transacciones, // Incluye todas las transacciones asociadas a este miembro
};
