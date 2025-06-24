export interface Despacho {
  ID: number;
  ID_Proveedor: number;
  ID_Producto: number;
  Fecha: string; // Formato 'YYYY-MM-DD'
}

export interface DespachoView extends Despacho {
  NombreProveedor: string;
  NombreProducto: string;
} 