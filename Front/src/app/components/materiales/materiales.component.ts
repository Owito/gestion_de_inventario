import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MaterialService } from '../../services/material.service';
import { Material } from '../../models/material.model';
import { MaterialDialogComponent } from './material-dialog/material-dialog.component';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css'],
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
export class MaterialesComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Nombre', 'Descripcion', 'Tipo', 'acciones'];
  dataSource = new MatTableDataSource<Material>();

  constructor(
    private materialService: MaterialService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadMateriales();
  }

  loadMateriales(): void {
    this.materialService.getMateriales().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  openDialog(material?: Material): void {
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: '450px',
      data: material
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.ID) {
          this.materialService.updateMaterial(result).subscribe(() => {
            this.loadMateriales();
            this.snackBar.open('Material actualizado con éxito', 'Cerrar', { duration: 3000 });
          });
        } else {
          const { ID, ...newMaterial } = result;
          this.materialService.addMaterial(newMaterial).subscribe(() => {
            this.loadMateriales();
            this.snackBar.open('Material agregado con éxito', 'Cerrar', { duration: 3000 });
          });
        }
      }
    });
  }

  deleteMaterial(id: number): void {
    this.materialService.deleteMaterial(id).subscribe(() => {
      this.loadMateriales();
      this.snackBar.open('Material eliminado con éxito', 'Cerrar', { duration: 3000 });
    });
  }
} 