import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Material } from '../../../models/material.model';

@Component({
  selector: 'app-material-dialog',
  templateUrl: './material-dialog.component.html',
  styleUrls: ['./material-dialog.component.css'],
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
export class MaterialDialogComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<MaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Material,
    private fb: FormBuilder
  ) {
    this.isEditMode = !!data;
    this.form = this.fb.group({
      ID: [data?.ID],
      Nombre: [data?.Nombre || '', Validators.required],
      Descripcion: [data?.Descripcion || '', Validators.required],
      Tipo: [data?.Tipo || '', Validators.required]
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