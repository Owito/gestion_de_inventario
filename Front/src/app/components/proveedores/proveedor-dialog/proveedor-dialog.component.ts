import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Proveedor } from '../../../models/proveedor.model';

@Component({
  selector: 'app-proveedor-dialog',
  templateUrl: './proveedor-dialog.component.html',
  styleUrls: ['./proveedor-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class ProveedorDialogComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<ProveedorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proveedor,
    private fb: FormBuilder
  ) {
    this.isEditMode = !!data;
    this.form = this.fb.group({
      ID: [data?.ID],
      Nombre: [data?.Nombre || '', Validators.required],
      Contacto: [data?.Contacto || '', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 