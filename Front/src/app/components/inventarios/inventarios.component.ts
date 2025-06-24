import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { InventarioService } from '../../services/inventario.service';
import { Inventario, InventarioView } from '../../models/inventario.model';
import { InventarioDialogComponent } from './inventario-dialog/inventario-dialog.component';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css'],
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
export class InventariosComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Fecha', 'Escuela', 'Material', 'Cantidad', 'acciones'];
  dataSource = new MatTableDataSource<InventarioView>();

  constructor(
    private inventarioService: InventarioService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadInventarios();
  }

  loadInventarios(): void {
    this.inventarioService.getInventarios().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  openDialog(inventario?: Inventario): void {
    const dialogRef = this.dialog.open(InventarioDialogComponent, {
      width: '450px',
      data: inventario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.ID) {
          this.inventarioService.updateInventario(result).subscribe(() => {
            this.loadInventarios();
            this.snackBar.open('Registro de inventario actualizado con éxito', 'Cerrar', { duration: 3000 });
          });
        } else {
          const { ID, ...newInventario } = result;
          this.inventarioService.addInventario(newInventario).subscribe(() => {
            this.loadInventarios();
            this.snackBar.open('Registro de inventario agregado con éxito', 'Cerrar', { duration: 3000 });
          });
        }
      }
    });
  }

  deleteInventario(id: number): void {
    this.inventarioService.deleteInventario(id).subscribe(() => {
      this.loadInventarios();
      this.snackBar.open('Registro de inventario eliminado con éxito', 'Cerrar', { duration: 3000 });
    });
  }
} 