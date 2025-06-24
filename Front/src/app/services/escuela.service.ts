import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Escuela } from '../models/escuela.model';

@Injectable({
  providedIn: 'root'
})
export class EscuelaService {
  private escuelas: Escuela[] = [
    { ID: 1, Nombre: 'Escuela Rural Los Pinos', Direccion: 'Vereda Los Pinos' },
    { ID: 2, Nombre: 'Escuela San Marcos', Direccion: 'Sector La Colina' },
    { ID: 3, Nombre: 'Institución Educativa El Manantial', Direccion: 'Corregimiento El Manantial' }
  ];
  private nextId = 4;

  constructor() { }

  getEscuelas(): Observable<Escuela[]> {
    return of(this.escuelas);
  }

  addEscuela(escuela: Omit<Escuela, 'ID'>): Observable<Escuela> {
    const nuevaEscuela: Escuela = { ...escuela, ID: this.nextId++ };
    this.escuelas.push(nuevaEscuela);
    return of(nuevaEscuela);
  }

  updateEscuela(escuela: Escuela): Observable<Escuela> {
    const index = this.escuelas.findIndex(e => e.ID === escuela.ID);
    if (index > -1) {
      this.escuelas[index] = escuela;
    }
    return of(escuela);
  }

  deleteEscuela(id: number): Observable<{}> {
    const index = this.escuelas.findIndex(e => e.ID === id);
    if (index > -1) {
      this.escuelas.splice(index, 1);
    }
    return of({});
  }
} 