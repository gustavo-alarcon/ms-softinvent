import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-crear-paquete',
  templateUrl: './crear-paquete.component.html',
  styles: []
})
export class CrearPaqueteComponent implements OnInit {
  createPackageFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CrearPaqueteComponent>,
    public dbs: DatabaseService
  ) { }

  ngOnInit() {
    this.createPackageFormGroup = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      sale: ['', Validators.required]
    });
  }

  deleteProduct(): void {
    this.dbs.deleteProduct(this.data.id);
    this.dialogRef.close(true);
  }

}
