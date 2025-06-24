import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Escuela } from '../../../models/escuela.model';

@Component({
  selector: 'app-escuela-dialog',
  templateUrl: './escuela-dialog.component.html',
  styleUrls: ['./escuela-dialog.component.css'],
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
export class EscuelaDialogComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<EscuelaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Escuela,
    private fb: FormBuilder
  ) {
    this.isEditMode = !!data;
    this.form = this.fb.group({
      ID: [data?.ID],
      Nombre: [data?.Nombre || '', Validators.required],
      Direccion: [data?.Direccion || '', Validators.required]
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