import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Despacho, DespachoView } from '../models/despacho.model';
import { ProveedorService } from './proveedor.service';
import { ProductoService } from './producto.service';

@Injectable({
  providedIn: 'root'
})
export class DespachoService {
  private despachos: Despacho[] = [
    { ID: 1, ID_Proveedor: 3, ID_Producto: 3, Fecha: '2025-05-25' },
    { ID: 2, ID_Proveedor: 1, ID_Producto: 4, Fecha: '2025-05-27' },
    { ID: 3, ID_Proveedor: 2, ID_Producto: 5, Fecha: '2025-05-28' },
    { ID: 4, ID_Proveedor: 4, ID_Producto: 6, Fecha: '2025-06-01' },
    { ID: 5, ID_Proveedor: 5, ID_Producto: 2, Fecha: '2025-06-02' }
  ];
  private nextId = 6;

  constructor(
    private proveedorService: ProveedorService,
    private productoService: ProductoService
  ) { }

  getDespachos(): Observable<DespachoView[]> {
    return combineLatest([
      of(this.despachos),
      this.proveedorService.getProveedores(),
      this.productoService.getProductos()
    ]).pipe(
      map(([despachos, proveedores, productos]) => {
        return despachos.map(despacho => {
          const proveedor = proveedores.find(p => p.ID === despacho.ID_Proveedor);
          const producto = productos.find(p => p.ID === despacho.ID_Producto);
          return {
            ...despacho,
            NombreProveedor: proveedor?.Nombre || 'N/A',
            NombreProducto: producto?.Nombre || 'N/A'
          };
        });
      })
    );
  }

  addDespacho(despacho: Omit<Despacho, 'ID'>): Observable<Despacho> {
    const nuevoDespacho: Despacho = { ...despacho, ID: this.nextId++ };
    this.despachos.push(nuevoDespacho);
    return of(nuevoDespacho);
  }

  updateDespacho(despacho: Despacho): Observable<Despacho> {
    const index = this.despachos.findIndex(d => d.ID === despacho.ID);
    if (index > -1) {
      this.despachos[index] = despacho;
    }
    return of(despacho);
  }

  deleteDespacho(id: number): Observable<{}> {
    const index = this.despachos.findIndex(d => d.ID === id);
    if (index > -1) {
      this.despachos.splice(index, 1);
    }
    return of({});
  }
} 