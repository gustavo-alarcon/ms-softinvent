import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/core/database.service';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-crear-almacen',
  templateUrl: './crear-almacen.component.html',
  styles: []
})
export class CrearAlmacenComponent implements OnInit {

  createWarehouseFormGroup: FormGroup;
  alreadyExist: boolean = false;
  loading: boolean = false;

  constructor(
    public dbs: DatabaseService,
    private fb: FormBuilder,
    public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<CrearAlmacenComponent>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.createWarehouseFormGroup = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      supName: ['', Validators.required],
      supLastname: ['', Validators.required],
      supEmail: [''],
      supPhone: ['']
    });

  }

  onSubmit() {

    this.loading = true;

    this.dbs.warehousesCollection.add({
      name: this.createWarehouseFormGroup.get('name').value.trim(),
      address: this.createWarehouseFormGroup.get('address').value.trim(),
      regDate: Date.now(),
      supervisor:{
        name: this.createWarehouseFormGroup.get('supName').value.trim(),
        lastname: this.createWarehouseFormGroup.get('supLastname').value.trim(),
        email: this.createWarehouseFormGroup.get('supEmail').value.trim(),
        phone: this.createWarehouseFormGroup.get('supPhone').value.trim()
      }
    }).then( ref => {
      ref.update({id: ref.id});

      this.loading = false;
      this.dialogRef.close();

      this.snackbar.open("Listo!", "Cerrar", {
        duration: 6000,
      });
    })
    .catch( err => {
      console.log(err);
    })
  }

  checkIfExist(warehouse): void {
    this.alreadyExist = false;

    var filteredRooms = this.dbs.warehouses.filter(option => option['name'].toString() === warehouse);

    if(filteredRooms.length > 0){
      this.alreadyExist = true;
      this.snackbar.open("Este almacén ya existe", "Cerrar", {
        duration: 4000
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
