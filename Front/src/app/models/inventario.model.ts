export interface Inventario {
  ID: number;
  ID_Escuela: number;
  ID_Material: number;
  Cantidad: number;
  Fecha: string; // Formato 'YYYY-MM-DD'
}

export interface InventarioView extends Inventario {
  NombreEscuela: string;
  NombreMaterial: string;
} 