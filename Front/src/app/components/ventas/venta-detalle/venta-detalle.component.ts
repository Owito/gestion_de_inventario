import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { VentaService } from '../../../services/venta.service';
import { DetalleVentaService } from '../../../services/detalleventa.service';
import { VentaView } from '../../../models/venta.model';
import { DetalleVentaView } from '../../../models/detalleventa.model';
import { DetalleVentaDialogComponent } from '../detalle-venta-dialog/detalle-venta-dialog.component';

@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.component.html',
  styleUrls: ['./venta-detalle.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CurrencyPipe,
    DatePipe,
    MatSnackBarModule,
    MatTooltipModule
  ]
})
export class VentaDetalleComponent implements OnInit {
  venta$: Observable<VentaView | undefined> = of(undefined);
  ventaId: number = 0;
  totalVenta: number = 0;
  
  displayedColumns: string[] = ['producto', 'cantidad', 'precioUnitario', 'subtotal', 'acciones'];
  dataSource = new MatTableDataSource<DetalleVentaView>();

  constructor(
    private route: ActivatedRoute,
    private ventaService: VentaService,
    private detalleVentaService: DetalleVentaService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.venta$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.ventaId = Number(params.get('id'));
        this.loadDetalles();
        return this.ventaService.getVentas().pipe(
            map(ventas => ventas.find(v => v.ID === this.ventaId))
        );
      })
    );
  }

  loadDetalles(): void {
    this.detalleVentaService.getDetallesPorVentaId(this.ventaId).subscribe(data => {
      this.dataSource.data = data;
      this.totalVenta = data.reduce((acc, item) => acc + item.Subtotal, 0);
    });
  }

  openAddProductoDialog(): void {
    const dialogRef = this.dialog.open(DetalleVentaDialogComponent, {
      width: '400px',
      data: { ID_Venta: this.ventaId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.detalleVentaService.addDetalle(result).subscribe(() => {
          this.loadDetalles();
          this.snackBar.open('Producto agregado a la venta', 'Cerrar', { duration: 3000 });
        });
      }
    });
  }

  deleteDetalle(id: number): void {
    this.detalleVentaService.deleteDetalle(id).subscribe(() => {
      this.loadDetalles();
      this.snackBar.open('Producto eliminado de la venta', 'Cerrar', { duration: 3000 });
    });
  }
} 