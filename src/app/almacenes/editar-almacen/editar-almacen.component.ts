import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/core/database.service';
import { MatSnackBar, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmarBorrarAlmacenComponent } from '../confirmar-borrar-almacen/confirmar-borrar-almacen.component';

@Component({
  selector: 'app-editar-almacen',
  templateUrl: './editar-almacen.component.html',
  styles: []
})
export class EditarAlmacenComponent implements OnInit {

  editWarehouseFormGroup: FormGroup;
  alreadyExist: boolean = false;
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dbs: DatabaseService,
    private fb: FormBuilder,
    public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<EditarAlmacenComponent>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.editWarehouseFormGroup = this.fb.group({
      name: [this.data.name, Validators.required],
      address: [this.data.address, Validators.required],
      supName: [this.data.supervisor.name, Validators.required],
      supLastname: [this.data.supervisor.lastname, Validators.required],
      supEmail: [this.data.supervisor.email],
      supPhone: [this.data.supervisor.phone]
    });

  }

  onSubmit() {

    this.loading = true;
    
    this.dbs.warehousesCollection.doc(this.data.id).update({
      name: this.editWarehouseFormGroup.get('name').value.trim(),
      address: this.editWarehouseFormGroup.get('address').value.trim(),
      supervisor: {
        name: this.editWarehouseFormGroup.get('supName').value.trim(),
        lastname: this.editWarehouseFormGroup.get('supLastname').value.trim(),
        email: this.editWarehouseFormGroup.get('supEmail').value.trim(),
        phone: this.editWarehouseFormGroup.get('supPhone').value.trim()
      }
    })
    .then(() => {
      this.loading = false;
      this.dialogRef.close();
      this.snackbar.open("Listo!" , "Cerrar", {
        duration: 6000,
      })
    })
    .catch( err => {
      this.snackbar.open(err, "Cerrar", {
        duration: 6000,
      });
    })
  }

  confirmDelete(): void{
    var confirmDialogRef = this.dialog.open(ConfirmarBorrarAlmacenComponent, {
      data: this.data,
      panelClass: 'ms-custom-modalbox'
    });

    confirmDialogRef.afterClosed().subscribe( res => {
      if(res === true){
        this.dialogRef.close();
      }else{
        this.snackbar.open('Ufff! ... menos mal te preguntamos', 'Cerrar', {
          duration: 6000
        })
      }
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
