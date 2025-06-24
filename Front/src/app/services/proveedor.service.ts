import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Proveedor } from '../models/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private proveedores: Proveedor[] = [
    { ID: 1, Nombre: 'Distribuciones Lara S.A.', Contacto: 'ventas@dlarasa.com' },
    { ID: 2, Nombre: 'Suministros Escolares Omega', Contacto: 'contacto@omega.edu' },
    { ID: 3, Nombre: 'Papelería Central', Contacto: 'info@papeleriacentral.com' },
    { ID: 4, Nombre: 'Grupo Didáctico Sur', Contacto: 'ventas@didacticosur.com' },
    { ID: 5, Nombre: 'Distribuidora Escolar Andina', Contacto: 'contacto@andina.com' }
  ];
  private nextId = 6;

  constructor() { }

  getProveedores(): Observable<Proveedor[]> {
    return of(this.proveedores);
  }

  addProveedor(proveedor: Omit<Proveedor, 'ID'>): Observable<Proveedor> {
    const nuevoProveedor: Proveedor = { ...proveedor, ID: this.nextId++ };
    this.proveedores.push(nuevoProveedor);
    return of(nuevoProveedor);
  }

  updateProveedor(proveedor: Proveedor): Observable<Proveedor> {
    const index = this.proveedores.findIndex(p => p.ID === proveedor.ID);
    if (index > -1) {
      this.proveedores[index] = proveedor;
      return of(proveedor);
    }
    return of(proveedor); // O manejar error
  }

  deleteProveedor(id: number): Observable<{}> {
    const index = this.proveedores.findIndex(p => p.ID === id);
    if (index > -1) {
      this.proveedores.splice(index, 1);
    }
    return of({});
  }
} 