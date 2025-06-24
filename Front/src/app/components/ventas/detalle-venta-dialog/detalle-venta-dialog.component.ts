import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Producto } from '../../../models/producto.model';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-detalle-venta-dialog',
  templateUrl: './detalle-venta-dialog.component.html',
  styleUrls: ['./detalle-venta-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class DetalleVentaDialogComponent implements OnInit {
  form: FormGroup;
  productos$: Observable<Producto[]>;

  constructor(
    public dialogRef: MatDialogRef<DetalleVentaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ID_Venta: number },
    private fb: FormBuilder,
    private productoService: ProductoService
  ) {
    this.form = this.fb.group({
      ID_Producto: ['', Validators.required],
      Cantidad: ['', [Validators.required, Validators.min(1)]]
    });
    this.productos$ = this.productoService.getProductos();
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close({
        ...this.form.value,
        ID_Venta: this.data.ID_Venta
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 