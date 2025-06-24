import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { ProductoDialogComponent } from './producto-dialog/producto-dialog.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
    MatSnackBarModule,
    MatTooltipModule
  ]
})
export class ProductosComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Nombre', 'Descripcion', 'PrecioUnitario', 'acciones'];
  dataSource = new MatTableDataSource<Producto>();

  constructor(
    private productoService: ProductoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.productoService.getProductos().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  openDialog(producto?: Producto): void {
    const dialogRef = this.dialog.open(ProductoDialogComponent, {
      width: '450px',
      data: producto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.ID) {
          this.productoService.updateProducto(result).subscribe(() => {
            this.loadProductos();
            this.snackBar.open('Producto actualizado con éxito', 'Cerrar', { duration: 3000 });
          });
        } else {
          const { ID, ...newProducto } = result;
          this.productoService.addProducto(newProducto).subscribe(() => {
            this.loadProductos();
            this.snackBar.open('Producto agregado con éxito', 'Cerrar', { duration: 3000 });
          });
        }
      }
    });
  }

  deleteProducto(id: number): void {
    this.productoService.deleteProducto(id).subscribe(() => {
      this.loadProductos();
      this.snackBar.open('Producto eliminado con éxito', 'Cerrar', { duration: 3000 });
    });
  }
} 