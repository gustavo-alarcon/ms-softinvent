import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmDeletePartyComponent } from '../confirmar-borrar-tercero/confirmar-borrar-tercero.component';

@Component({
  selector: 'app-editar-tercero',
  templateUrl: './editar-tercero.component.html',
  styles: []
})
export class EditPartyComponent implements OnInit {

  editPartyFormGroup: FormGroup;
  alreadyExist: boolean = false;
  isRUC: boolean = false;
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dbs: DatabaseService,
    private fb: FormBuilder,
    public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<EditPartyComponent>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.editPartyFormGroup = this.fb.group({
      type: [this.data.type , Validators.required],
      docType: [this.data.docType, Validators.required],
      docNum: [this.data.docNum, Validators.required],
      name: [this.data.name, Validators.required],
      address: [this.data.address],
      contactName: [this.data.contact.name],
      contactLastname: [this.data.contact.lastname],
      contactEmail: [this.data.contact.email],
      contactPhone: [this.data.contact.phone]
    });

    if(this.data.docType == 'RUC'){
      this.isRUC = true;
    }
  }

  onSubmit() {

    this.loading = true;
    
    this.dbs.partiesCollection.doc(this.data.id).update({
      type: this.editPartyFormGroup.get('type').value,
      docType: this.editPartyFormGroup.get('docType').value,
      docNum: this.editPartyFormGroup.get('docNum').value.trim(),
      name: this.editPartyFormGroup.get('name').value.trim(),
      address: this.editPartyFormGroup.get('address').value.trim(),
      regDate: Date.now(),
      contact: {
        name: this.editPartyFormGroup.get('contactName').value.trim(),
        lastname: this.editPartyFormGroup.get('contactLastname').value.trim(),
        email: this.editPartyFormGroup.get('contactEmail').value.trim(),
        phone: this.editPartyFormGroup.get('contactPhone').value.trim()
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

  checkIfExist(docNum): void {
    this.alreadyExist = false;

    var filteredParties = this.dbs.parties.filter(option => option['docNum'].toString() === docNum);

    if(filteredParties.length > 0){
      this.alreadyExist = true;
      this.snackbar.open("Este tercero ya existe", "Cerrar", {
        duration: 4000
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
