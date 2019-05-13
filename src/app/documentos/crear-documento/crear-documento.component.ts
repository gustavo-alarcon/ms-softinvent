import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-crear-documento',
  templateUrl: './crear-documento.component.html',
  styles: []
})
export class CrearDocumentoComponent implements OnInit {

  createDocumentFormGroup: FormGroup;
  aliasAlreadyExist: boolean = false;
  nameAlreadyExist: boolean = false;
  loading: boolean = false;
  selectedNature: any;
  disableFields: boolean = false;


  constructor(
    public dbs: DatabaseService,
    private fb: FormBuilder,
    public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<CrearDocumentoComponent>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.createDocumentFormGroup = this.fb.group({
      alias: ['', Validators.required],
      name: ['', Validators.required],
      nature: ['', Validators.required],
      partyType: ['', Validators.required],
      serie: [{value: '', disabled: this.disableFields}, Validators.required],
      initialCorrelative: [{value: '', disabled: this.disableFields}, Validators.required],
      actualCorrelative: 0,
    });

    this.createDocumentFormGroup.get('nature').valueChanges.subscribe( data => {
      if(data === 'ENTRADA'){
        this.createDocumentFormGroup.get('serie').setErrors(null);
        this.createDocumentFormGroup.get('initialCorrelative').setErrors(null);
        this.createDocumentFormGroup.patchValue({
          serie: 0,
          initialCorrelative: 0
        });
      }else{
        this.createDocumentFormGroup.get('serie').setErrors(null);
        this.createDocumentFormGroup.get('initialCorrelative').setErrors(null);
        this.createDocumentFormGroup.patchValue({
          serie: '',
          initialCorrelative: ''
        });
      }
    })

  }

  onSubmit() {

    this.loading = true;

    this.dbs.documentsCollection.add({
      alias: this.createDocumentFormGroup.get('alias').value.trim(),
      name: this.createDocumentFormGroup.get('name').value.trim(),
      nature: this.createDocumentFormGroup.get('nature').value.trim(),
      partyType: this.createDocumentFormGroup.get('partyType').value.trim(),
      serie: this.createDocumentFormGroup.get('serie').value.toString().trim(),
      initialCorrelative: this.createDocumentFormGroup.get('initialCorrelative').value,
      actualCorrelative: this.createDocumentFormGroup.get('initialCorrelative').value,
      regDate: Date.now()
    }).then( ref => {
      
      ref.update({id: ref.id});

      /*
      for (let correlative = this.createDocumentFormGroup.get('correlativeStart').value; correlative <= this.createDocumentFormGroup.get('correlativeEnd').value; correlative++) {
        ref.collection(`book`).add({
          id: '',
          documentId: ref.id,
          serie: this.createDocumentFormGroup.get('serie').value.trim(),
          correlative: correlative,
          documentNature: this.createDocumentFormGroup.get('nature').value.trim(),
          documentName: this.createDocumentFormGroup.get('name').value.trim(),
          warehouseOrigin: '',
          warehouseDestination: '',
          partyId: '',
          partyName: '',
          partyDoc: '',
          partyDocNum: '',
          vendorId: '',
          vendorName: '',
          userId: '',
          userName: '',
          productList: [],
          observations: '',
          state: 'Disponible',
          regDate: 0
        }).then( ref => {
          ref.update({id: ref.id});
        })
      }*/

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

  checkIfAliasExist(alias): void {

    this.aliasAlreadyExist = false;

    var filteredDocuments = this.dbs.documents.filter(option => option['alias'].toString() === alias);

    if(filteredDocuments.length > 0){
      this.aliasAlreadyExist = true;
      this.snackbar.open("Este alias ya existe", "Cerrar", {
        duration: 4000
      })
    }

  }

  checkIfNameExist(name): void {

    this.nameAlreadyExist = false;

    var filteredDocuments = this.dbs.documents.filter(option => option['name'].toString() === name);

    if(filteredDocuments.length > 0){
      this.nameAlreadyExist = true;
      this.snackbar.open("Este documento ya existe", "Cerrar", {
        duration: 4000
      })
    }

  }

}
