import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos: Producto[] = [
    { ID: 1, Nombre: 'Mochila escolar básica', Descripcion: 'Mochila de lona con refuerzos', PrecioUnitario: 450000.00 },
    { ID: 2, Nombre: 'Cartuchera con cierre', Descripcion: 'Cartuchera estampada con cremallera', PrecioUnitario: 100000.00 },
    { ID: 3, Nombre: 'Colores escolares', Descripcion: 'Caja de 12 colores Faber Castell', PrecioUnitario: 102000.00 },
    { ID: 4, Nombre: 'Cuaderno profesional', Descripcion: 'Cuaderno argollado de 100 hojas', PrecioUnitario: 85000.00 },
    { ID: 5, Nombre: 'Pega escolar', Descripcion: 'Pega blanca no tóxica de 250ml', PrecioUnitario: 50000.00 },
    { ID: 6, Nombre: 'Regla de 30cm', Descripcion: 'Regla plástica transparente', PrecioUnitario: 30000.00 },
    { ID: 7, Nombre: 'Marcadores borrables', Descripcion: 'Set de 4 marcadores para tablero', PrecioUnitario: 150000.00 }
  ];
  private nextId = 8;

  constructor() { }

  getProductos(): Observable<Producto[]> {
    return of(this.productos);
  }

  addProducto(producto: Omit<Producto, 'ID'>): Observable<Producto> {
    const nuevoProducto: Producto = { ...producto, ID: this.nextId++ };
    this.productos.push(nuevoProducto);
    return of(nuevoProducto);
  }

  updateProducto(producto: Producto): Observable<Producto> {
    const index = this.productos.findIndex(p => p.ID === producto.ID);
    if (index > -1) {
      this.productos[index] = producto;
    }
    return of(producto);
  }

  deleteProducto(id: number): Observable<{}> {
    const index = this.productos.findIndex(p => p.ID === id);
    if (index > -1) {
      this.productos.splice(index, 1);
    }
    return of({});
  }
} 