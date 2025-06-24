import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { DetalleVenta, DetalleVentaView } from '../models/detalleventa.model';
import { ProductoService } from './producto.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {
  private detalles: DetalleVenta[] = [
    { ID: 1, ID_Venta: 3, ID_Producto: 3, Cantidad: 5 },
    { ID: 2, ID_Venta: 3, ID_Producto: 4, Cantidad: 2 },
    { ID: 3, ID_Venta: 4, ID_Producto: 2, Cantidad: 4 },
    { ID: 4, ID_Venta: 4, ID_Producto: 5, Cantidad: 3 },
    { ID: 5, ID_Venta: 5, ID_Producto: 5, Cantidad: 5 },
    { ID: 6, ID_Venta: 2, ID_Producto: 1, Cantidad: 2 },
    { ID: 7, ID_Venta: 2, ID_Producto: 6, Cantidad: 1 },
    { ID: 8, ID_Venta: 1, ID_Producto: 2, Cantidad: 3 },
    { ID: 9, ID_Venta: 1, ID_Producto: 4, Cantidad: 2 }
  ];
  private nextId = 10;

  constructor(private productoService: ProductoService) { }

  getDetallesPorVentaId(ventaId: number): Observable<DetalleVentaView[]> {
    return combineLatest([
      of(this.detalles.filter(d => d.ID_Venta === ventaId)),
      this.productoService.getProductos()
    ]).pipe(
      map(([detalles, productos]) => {
        return detalles.map(detalle => {
          const producto = productos.find(p => p.ID === detalle.ID_Producto);
          return {
            ...detalle,
            NombreProducto: producto?.Nombre || 'N/A',
            PrecioUnitario: producto?.PrecioUnitario || 0,
            Subtotal: detalle.Cantidad * (producto?.PrecioUnitario || 0)
          };
        });
      })
    );
  }

  addDetalle(detalle: Omit<DetalleVenta, 'ID'>): Observable<DetalleVenta> {
    const nuevoDetalle: DetalleVenta = { ...detalle, ID: this.nextId++ };
    this.detalles.push(nuevoDetalle);
    return of(nuevoDetalle);
  }

  deleteDetalle(id: number): Observable<{}> {
    const index = this.detalles.findIndex(d => d.ID === id);
    if (index > -1) {
      this.detalles.splice(index, 1);
    }
    return of({});
  }
} 