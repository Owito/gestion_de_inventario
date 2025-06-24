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

import { Venta } from '../../../models/venta.model';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-venta-dialog',
  templateUrl: './venta-dialog.component.html',
  styleUrls: ['./venta-dialog.component.css'],
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
export class VentaDialogComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean;
  clientes$: Observable<Cliente[]>;

  constructor(
    public dialogRef: MatDialogRef<VentaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Venta,
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {
    this.isEditMode = !!data;
    this.form = this.fb.group({
      ID: [data?.ID],
      Fecha: [null, Validators.required],
      ID_Cliente: [data?.ID_Cliente || '', Validators.required]
    });
    this.clientes$ = this.clienteService.getClientes();
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