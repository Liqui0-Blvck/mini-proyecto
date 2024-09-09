export interface TransaccionPago {
  id: number;
  miembro: number; 
  cantidad: number; 
  fecha_transaccion: string; 
  estado: string;
  metodo_pago: string;
  
}



export interface SuscripcionUsuario {
  id: number;
  miembro: number; 
  tipo_membresia: string;
  fecha_inicio?: string; 
  fecha_expiracion?: string; 
  activa: boolean;
  transacciones?: TransaccionPago[]  ; 
}

