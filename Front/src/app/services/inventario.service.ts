import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inventario, InventarioView } from '../models/inventario.model';
import { EscuelaService } from './escuela.service';
import { MaterialService } from './material.service';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private inventarios: Inventario[] = [
    { ID: 1, ID_Escuela: 3, ID_Material: 3, Cantidad: 120, Fecha: '2025-05-18' },
    { ID: 2, ID_Escuela: 2, ID_Material: 1, Cantidad: 80, Fecha: '2025-05-20' },
    { ID: 3, ID_Escuela: 2, ID_Material: 2, Cantidad: 90, Fecha: '2025-05-21' },
    { ID: 4, ID_Escuela: 3, ID_Material: 4, Cantidad: 150, Fecha: '2025-05-22' },
    { ID: 5, ID_Escuela: 1, ID_Material: 1, Cantidad: 200, Fecha: '2025-05-23' },
    { ID: 6, ID_Escuela: 2, ID_Material: 4, Cantidad: 110, Fecha: '2025-05-24' },
    { ID: 7, ID_Escuela: 1, ID_Material: 3, Cantidad: 95, Fecha: '2025-05-25' },
    { ID: 8, ID_Escuela: 3, ID_Material: 2, Cantidad: 170, Fecha: '2025-05-26' }
  ];
  private nextId = 9;

  constructor(
    private escuelaService: EscuelaService,
    private materialService: MaterialService
  ) { }

  getInventarios(): Observable<InventarioView[]> {
    return combineLatest([
      of(this.inventarios),
      this.escuelaService.getEscuelas(),
      this.materialService.getMateriales()
    ]).pipe(
      map(([inventarios, escuelas, materiales]) => {
        return inventarios.map(inventario => {
          const escuela = escuelas.find(e => e.ID === inventario.ID_Escuela);
          const material = materiales.find(m => m.ID === inventario.ID_Material);
          return {
            ...inventario,
            NombreEscuela: escuela?.Nombre || 'N/A',
            NombreMaterial: material?.Nombre || 'N/A'
          };
        });
      })
    );
  }

  addInventario(inventario: Omit<Inventario, 'ID'>): Observable<Inventario> {
    const nuevoInventario: Inventario = { ...inventario, ID: this.nextId++ };
    this.inventarios.push(nuevoInventario);
    return of(nuevoInventario);
  }

  updateInventario(inventario: Inventario): Observable<Inventario> {
    const index = this.inventarios.findIndex(i => i.ID === inventario.ID);
    if (index > -1) {
      this.inventarios[index] = inventario;
    }
    return of(inventario);
  }

  deleteInventario(id: number): Observable<{}> {
    const index = this.inventarios.findIndex(i => i.ID === id);
    if (index > -1) {
      this.inventarios.splice(index, 1);
    }
    return of({});
  }
} 