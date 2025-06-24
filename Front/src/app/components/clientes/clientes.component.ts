import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { ClienteDialogComponent } from './cliente-dialog/cliente-dialog.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    ClienteDialogComponent 
  ]
})
export class ClientesComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Nombre', 'Contacto', 'acciones'];
  dataSource = new MatTableDataSource<Cliente>();

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.getClientes().subscribe(clientes => {
      this.dataSource.data = clientes;
    });
  }

  openDialog(cliente?: Cliente): void {
    const dialogRef = this.dialog.open(ClienteDialogComponent, {
      width: '400px',
      data: cliente
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      if (result.ID_Cliente) {
        this.clienteService.updateCliente(result).subscribe(() => {
          this.snackBar.open('Cliente actualizado con éxito', 'Cerrar', { duration: 3000 });
          this.loadClientes();
        });
      } else {
        this.clienteService.addCliente(result).subscribe(() => {
          this.snackBar.open('Cliente agregado con éxito', 'Cerrar', { duration: 3000 });
          this.loadClientes();
        });
      }
    });
  }

  deleteCliente(id: number): void {
    this.clienteService.deleteCliente(id).subscribe(() => {
      this.snackBar.open('Cliente eliminado con éxito', 'Cerrar', { duration: 3000 });
      this.loadClientes();
    });
  }
}
