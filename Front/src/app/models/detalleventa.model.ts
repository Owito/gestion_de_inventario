export interface DetalleVenta {
  ID: number;
  ID_Venta: number;
  ID_Producto: number;
  Cantidad: number;
}

// Modelo para la vista, incluyendo nombre y precios del producto
export interface DetalleVentaView {
  ID: number;
  ID_Venta: number;
  ID_Producto: number;
  NombreProducto: string;
  Cantidad: number;
  PrecioUnitario: number;
  Subtotal: number;
} 