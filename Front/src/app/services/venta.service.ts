import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Venta, VentaView } from '../models/venta.model';
import { ClienteService } from './cliente.service';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private ventas: Venta[] = [
    { ID: 1, Fecha: '2025-06-03', ID_Cliente: 3 },
    { ID: 2, Fecha: '2025-06-03', ID_Cliente: 4 },
    { ID: 3, Fecha: '2025-06-04', ID_Cliente: 5 },
    { ID: 4, Fecha: '2025-06-04', ID_Cliente: 2 },
    { ID: 5, Fecha: '2025-06-05', ID_Cliente: 1 }
  ];
  private nextId = 6;

  constructor(private clienteService: ClienteService) { }

  getVentas(): Observable<VentaView[]> {
    return combineLatest([
      of(this.ventas),
      this.clienteService.getClientes()
    ]).pipe(
      map(([ventas, clientes]) => {
        return ventas.map(venta => {
          const cliente = clientes.find(c => c.ID_Cliente === venta.ID_Cliente);
          return {
            ...venta,
            NombreCliente: cliente ? cliente.Nombre : 'Cliente no encontrado'
          };
        });
      })
    );
  }

  addVenta(venta: Omit<Venta, 'ID'>): Observable<Venta> {
    const nuevaVenta: Venta = { ...venta, ID: this.nextId++ };
    this.ventas.push(nuevaVenta);
    return of(nuevaVenta);
  }

  updateVenta(venta: Venta): Observable<Venta> {
    const index = this.ventas.findIndex(v => v.ID === venta.ID);
    if (index > -1) {
      this.ventas[index] = venta;
    }
    return of(venta);
  }

  deleteVenta(id: number): Observable<{}> {
    const index = this.ventas.findIndex(v => v.ID === id);
    if (index > -1) {
      this.ventas.splice(index, 1);
    }
    return of({});
  }
} 