export interface Venta {
  ID: number;
  Fecha: string; // Usaremos string en formato ISO 'YYYY-MM-DD'
  ID_Cliente: number;
}

// Modelo para mostrar en la tabla, incluyendo el nombre del cliente
export interface VentaView extends Venta {
  NombreCliente: string;
} 