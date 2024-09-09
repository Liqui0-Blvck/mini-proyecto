import { TransaccionPago } from "../types/suscripciones/Suscripcion.type";

export const transacciones: TransaccionPago[] = [
  {
    id: 1,
    miembro: 1,
    cantidad: 50.00,
    fecha_transaccion: '2024-09-01T10:00:00Z',
    estado: 'Completado',
    metodo_pago: 'Tarjeta Crédito', // Método de pago
  },
  {
    id: 2,
    miembro: 1,
    cantidad: 75.50,
    fecha_transaccion: '2024-09-02T11:15:00Z',
    estado: 'Pendiente',
    metodo_pago: 'Débito', // Método de pago
  },
  {
    id: 3,
    miembro: 1,
    cantidad: 100.00,
    fecha_transaccion: '2024-09-03T09:30:00Z',
    estado: 'Fallido',
    metodo_pago: 'Efectivo', // Método de pago
  },
  {
    id: 4,
    miembro: 1,
    cantidad: 200.25,
    fecha_transaccion: '2024-09-04T14:45:00Z',
    estado: 'Completado',
    metodo_pago: 'Tarjeta Crédito', // Método de pago
  },
  {
    id: 5,
    miembro: 1,
    cantidad: 30.75,
    fecha_transaccion: '2024-09-05T16:00:00Z',
    estado: 'Reembolsado',
    metodo_pago: 'Débito', // Método de pago
  },
  {
    id: 6,
    miembro: 1,
    cantidad: 120.00,
    fecha_transaccion: '2024-09-06T12:15:00Z',
    estado: 'Completado',
    metodo_pago: 'Efectivo', // Método de pago
  },
  {
    id: 7,
    miembro: 1,
    cantidad: 85.00,
    fecha_transaccion: '2024-09-07T13:30:00Z',
    estado: 'Pendiente',
    metodo_pago: 'Tarjeta Crédito', // Método de pago
  },
  {
    id: 8,
    miembro: 1,
    cantidad: 95.50,
    fecha_transaccion: '2024-09-08T08:45:00Z',
    estado: 'Completado',
    metodo_pago: 'Débito', // Método de pago
  },
  {
    id: 9,
    miembro: 1,
    cantidad: 60.00,
    fecha_transaccion: '2024-09-09T17:00:00Z',
    estado: 'Fallido',
    metodo_pago: 'Efectivo', // Método de pago
  },
  {
    id: 10,
    miembro: 1,
    cantidad: 40.00,
    fecha_transaccion: '2024-09-10T15:00:00Z',
    estado: 'Reembolsado',
    metodo_pago: 'Tarjeta Crédito', // Método de pago
  },
];
