import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { VentaService } from '../../services/venta.service';
import { Venta, VentaView } from '../../models/venta.model';
import { VentaDialogComponent } from './venta-dialog/venta-dialog.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    RouterLink,
    MatTooltipModule,
    MatSnackBarModule
  ]
})
export class VentasComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Fecha', 'Cliente', 'acciones'];
  dataSource = new MatTableDataSource<VentaView>();

  constructor(
    private ventaService: VentaService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadVentas();
  }

  loadVentas(): void {
    this.ventaService.getVentas().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  openDialog(venta?: Venta): void {
    const dialogRef = this.dialog.open(VentaDialogComponent, {
      width: '450px',
      data: venta
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.ID) {
          this.ventaService.updateVenta(result).subscribe(() => {
            this.loadVentas();
            this.snackBar.open('Venta actualizada con éxito', 'Cerrar', { duration: 3000 });
          });
        } else {
          const { ID, ...newVenta } = result;
          this.ventaService.addVenta(newVenta).subscribe(() => {
            this.loadVentas();
            this.snackBar.open('Venta registrada con éxito', 'Cerrar', { duration: 3000 });
          });
        }
      }
    });
  }

  deleteVenta(id: number): void {
    this.ventaService.deleteVenta(id).subscribe(() => {
      this.loadVentas();
      this.snackBar.open('Venta eliminada con éxito', 'Cerrar', { duration: 3000 });
    });
  }
} 