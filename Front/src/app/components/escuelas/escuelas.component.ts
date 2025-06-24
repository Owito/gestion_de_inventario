import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { EscuelaService } from '../../services/escuela.service';
import { Escuela } from '../../models/escuela.model';
import { EscuelaDialogComponent } from './escuela-dialog/escuela-dialog.component';

@Component({
  selector: 'app-escuelas',
  templateUrl: './escuelas.component.html',
  styleUrls: ['./escuelas.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule
  ]
})
export class EscuelasComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Nombre', 'Direccion', 'acciones'];
  dataSource = new MatTableDataSource<Escuela>();

  constructor(
    private escuelaService: EscuelaService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEscuelas();
  }

  loadEscuelas(): void {
    this.escuelaService.getEscuelas().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  openDialog(escuela?: Escuela): void {
    const dialogRef = this.dialog.open(EscuelaDialogComponent, {
      width: '450px',
      data: escuela
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.ID) {
          this.escuelaService.updateEscuela(result).subscribe(() => {
            this.loadEscuelas();
            this.snackBar.open('Escuela actualizada con éxito', 'Cerrar', { duration: 3000 });
          });
        } else {
          const { ID, ...newEscuela } = result;
          this.escuelaService.addEscuela(newEscuela).subscribe(() => {
            this.loadEscuelas();
            this.snackBar.open('Escuela agregada con éxito', 'Cerrar', { duration: 3000 });
          });
        }
      }
    });
  }

  deleteEscuela(id: number): void {
    this.escuelaService.deleteEscuela(id).subscribe(() => {
      this.loadEscuelas();
      this.snackBar.open('Escuela eliminada con éxito', 'Cerrar', { duration: 3000 });
    });
  }
} 