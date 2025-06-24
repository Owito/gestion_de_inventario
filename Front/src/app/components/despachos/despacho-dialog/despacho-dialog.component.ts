import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Despacho } from '../../../models/despacho.model';
import { Proveedor } from '../../../models/proveedor.model';
import { Producto } from '../../../models/producto.model';
import { ProveedorService } from '../../../services/proveedor.service';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-despacho-dialog',
  templateUrl: './despacho-dialog.component.html',
  styleUrls: ['./despacho-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule
  ]
})
export class DespachoDialogComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean;
  proveedores$: Observable<Proveedor[]>;
  productos$: Observable<Producto[]>;

  constructor(
    public dialogRef: MatDialogRef<DespachoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Despacho,
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private productoService: ProductoService
  ) {
    this.isEditMode = !!data;
    this.form = this.fb.group({
      ID: [data?.ID],
      Fecha: [null, Validators.required],
      ID_Proveedor: [data?.ID_Proveedor || '', Validators.required],
      ID_Producto: [data?.ID_Producto || '', Validators.required]
    });
    this.proveedores$ = this.proveedorService.getProveedores();
    this.productos$ = this.productoService.getProductos();
  }

  ngOnInit(): void {
    if (this.data?.Fecha) {
      const dateParts = this.data.Fecha.split('-').map(Number);
      const safeDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
      this.form.get('Fecha')?.setValue(safeDate);
    }
  }

  onSave(): void {
    if (this.form.valid) {
      const rawValue = this.form.getRawValue();
      const date = rawValue.Fecha as Date;

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      this.dialogRef.close({ ...rawValue, Fecha: formattedDate });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 