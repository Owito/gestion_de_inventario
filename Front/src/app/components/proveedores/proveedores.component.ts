import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../models/proveedor.model';
import { ProveedorDialogComponent } from './proveedor-dialog/proveedor-dialog.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
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
export class ProveedoresComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Nombre', 'Contacto', 'acciones'];
  dataSource = new MatTableDataSource<Proveedor>();

  constructor(
    private proveedorService: ProveedorService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProveedores();
  }

  loadProveedores(): void {
    this.proveedorService.getProveedores().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  openDialog(proveedor?: Proveedor): void {
    const dialogRef = this.dialog.open(ProveedorDialogComponent, {
      width: '400px',
      data: proveedor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.ID) {
          this.proveedorService.updateProveedor(result).subscribe(() => {
            this.loadProveedores();
            this.snackBar.open('Proveedor actualizado con éxito', 'Cerrar', { duration: 3000 });
          });
        } else {
          const { ID, ...newProveedor } = result;
          this.proveedorService.addProveedor(newProveedor).subscribe(() => {
            this.loadProveedores();
            this.snackBar.open('Proveedor agregado con éxito', 'Cerrar', { duration: 3000 });
          });
        }
      }
    });
  }

  deleteProveedor(id: number): void {
    this.proveedorService.deleteProveedor(id).subscribe(() => {
      this.loadProveedores();
      this.snackBar.open('Proveedor eliminado con éxito', 'Cerrar', { duration: 3000 });
    });
  }
} 