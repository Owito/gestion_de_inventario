import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../../models/cliente.model';

@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.css'],
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
export class ClienteDialogComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Cliente>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      ID_Cliente: [data?.ID_Cliente ?? null],
      Nombre: [data?.Nombre ?? '', Validators.required],
      Contacto: [data?.Contacto ?? '', [Validators.required, Validators.email]]
    });
  }

  onSave(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
