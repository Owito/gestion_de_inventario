import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Material } from '../models/material.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private materiales: Material[] = [
    { ID: 1, Nombre: 'Tijeras escolares', Descripcion: 'Tijeras de punta redonda para niños', Tipo: 'Escolar' },
    { ID: 2, Nombre: 'Colores', Descripcion: 'Caja de 12 colores de madera', Tipo: 'Escolar' },
    { ID: 3, Nombre: 'Pegante en barra', Descripcion: 'Pegante no tóxico para uso escolar', Tipo: 'Escolar' },
    { ID: 4, Nombre: 'Papel bond', Descripcion: 'Papel bond tamaño carta', Tipo: 'Oficina' }
  ];
  private nextId = 5;

  constructor() { }

  getMateriales(): Observable<Material[]> {
    return of(this.materiales);
  }

  addMaterial(material: Omit<Material, 'ID'>): Observable<Material> {
    const nuevoMaterial: Material = { ...material, ID: this.nextId++ };
    this.materiales.push(nuevoMaterial);
    return of(nuevoMaterial);
  }

  updateMaterial(material: Material): Observable<Material> {
    const index = this.materiales.findIndex(m => m.ID === material.ID);
    if (index > -1) {
      this.materiales[index] = material;
    }
    return of(material);
  }

  deleteMaterial(id: number): Observable<{}> {
    const index = this.materiales.findIndex(m => m.ID === id);
    if (index > -1) {
      this.materiales.splice(index, 1);
    }
    return of({});
  }
} 