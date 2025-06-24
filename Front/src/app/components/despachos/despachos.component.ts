import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DespachoService } from '../../services/despacho.service';
import { Despacho, DespachoView } from '../../models/despacho.model';
import { DespachoDialogComponent } from './despacho-dialog/despacho-dialog.component';

@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    MatSnackBarModule,
    MatTooltipModule
  ]
})
export class DespachosComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Fecha', 'Proveedor', 'Producto', 'acciones'];
  dataSource = new MatTableDataSource<DespachoView>();

  constructor(
    private despachoService: DespachoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDespachos();
  }

  loadDespachos(): void {
    this.despachoService.getDespachos().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  openDialog(despacho?: Despacho): void {
    const dialogRef = this.dialog.open(DespachoDialogComponent, {
      width: '450px',
      data: despacho
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.ID) {
          this.despachoService.updateDespacho(result).subscribe(() => {
            this.loadDespachos();
            this.snackBar.open('Despacho actualizado con éxito', 'Cerrar', { duration: 3000 });
          });
        } else {
          const { ID, ...newDespacho } = result;
          this.despachoService.addDespacho(newDespacho).subscribe(() => {
            this.loadDespachos();
            this.snackBar.open('Despacho registrado con éxito', 'Cerrar', { duration: 3000 });
          });
        }
      }
    });
  }

  deleteDespacho(id: number): void {
    this.despachoService.deleteDespacho(id).subscribe(() => {
      this.loadDespachos();
      this.snackBar.open('Despacho eliminado con éxito', 'Cerrar', { duration: 3000 });
    });
  }
} 