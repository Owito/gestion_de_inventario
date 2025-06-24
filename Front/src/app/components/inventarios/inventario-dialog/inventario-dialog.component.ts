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

import { Inventario } from '../../../models/inventario.model';
import { Escuela } from '../../../models/escuela.model';
import { Material } from '../../../models/material.model';
import { EscuelaService } from '../../../services/escuela.service';
import { MaterialService } from '../../../services/material.service';

@Component({
  selector: 'app-inventario-dialog',
  templateUrl: './inventario-dialog.component.html',
  styleUrls: ['./inventario-dialog.component.css'],
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
export class InventarioDialogComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean;
  escuelas$: Observable<Escuela[]>;
  materiales$: Observable<Material[]>;

  constructor(
    public dialogRef: MatDialogRef<InventarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inventario,
    private fb: FormBuilder,
    private escuelaService: EscuelaService,
    private materialService: MaterialService
  ) {
    this.isEditMode = !!data;
    this.form = this.fb.group({
      ID: [data?.ID],
      Fecha: [null, Validators.required],
      ID_Escuela: [data?.ID_Escuela || '', Validators.required],
      ID_Material: [data?.ID_Material || '', Validators.required],
      Cantidad: [data?.Cantidad || '', [Validators.required, Validators.min(1)]]
    });
    this.escuelas$ = this.escuelaService.getEscuelas();
    this.materiales$ = this.materialService.getMateriales();
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