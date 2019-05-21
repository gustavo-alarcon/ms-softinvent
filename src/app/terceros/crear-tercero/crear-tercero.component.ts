import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/core/database.service';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-crear-tercero',
  templateUrl: './crear-tercero.component.html',
  styles: []
})
export class CrearTerceroComponent implements OnInit {

  createPartyFormGroup: FormGroup;
  alreadyExist: boolean = false;
  loading: boolean = false;

  constructor(
    public dbs: DatabaseService,
    private fb: FormBuilder,
    public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<CrearTerceroComponent>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.createPartyFormGroup = this.fb.group({
      type: ['', Validators.required],
      docType: ['', Validators.required],
      docNum: ['', Validators.required],
      name: ['', Validators.required],
      address: [''],
      contactName: [''],
      contactLastname: [''],
      contactEmail: [''],
      contactPhone: ['']
    });

  }

  onSubmit() {

    this.loading = true;

    this.dbs.partiesCollection.add({
      type: this.createPartyFormGroup.get('type').value,
      docType: this.createPartyFormGroup.get('docType').value,
      docNum: this.createPartyFormGroup.get('docNum').value.trim(),
      name: this.createPartyFormGroup.get('name').value.trim(),
      address: this.createPartyFormGroup.get('address').value.trim(),
      regDate: Date.now(),
      contact:{
        name: this.createPartyFormGroup.get('contactName').value.trim(),
        lastname: this.createPartyFormGroup.get('contactLastname').value.trim(),
        email: this.createPartyFormGroup.get('contactEmail').value.trim(),
        phone: this.createPartyFormGroup.get('contactPhone').value.trim()
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
