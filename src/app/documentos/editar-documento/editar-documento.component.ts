import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmarBorrarDocumentoComponent } from '../confirmar-borrar-documento/confirmar-borrar-documento.component';
import { ExtenderCorrelativoComponent } from '../extender-correlativo/extender-correlativo.component';

@Component({
  selector: 'app-editar-documento',
  templateUrl: './editar-documento.component.html',
  styles: []
})
export class EditarDocumentoComponent implements OnInit {

  editDocumentFormGroup: FormGroup;
  aliasAlreadyExist: boolean = false;
  nameAlreadyExist: boolean = false;
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dbs: DatabaseService,
    private fb: FormBuilder,
    public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<EditarDocumentoComponent>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.editDocumentFormGroup = this.fb.group({
      alias: [this.data.alias, Validators.required],
      name: [this.data.name, Validators.required],
      nature: [this.data.nature, Validators.required],
      partyType: [this.data.partyType, Validators.required],
      serie: [this.data.serie, Validators.required],
      prefix: [this.data.prefix],
      initialCorrelative: [this.data.initialCorrelative, Validators.required],
      actualCorrelative: [this.data.actualCorrelative, Validators.required],
      suffix: [this.data.suffix],
    });

  }

  onSubmit() {

    this.loading = true;

    this.dbs.documentsCollection.doc(this.data.id).update({
      alias: this.editDocumentFormGroup.get('alias').value.trim(),
      name: this.editDocumentFormGroup.get('name').value.trim(),
      nature: this.editDocumentFormGroup.get('nature').value.trim(),
      partyType: this.editDocumentFormGroup.get('partyType').value.trim(),
      serie: this.editDocumentFormGroup.get('serie').value.trim(),
      initialCorrelative: this.editDocumentFormGroup.get('initialCorrelative').value,
      actualCorrelative: this.editDocumentFormGroup.get('actualCorrelative').value,
      regDate: Date.now()
    })
    .then( () => {
      
      /*
      this.dbs.getBookOfDocument(this.data.id).get().subscribe( snapshot => {
        snapshot.docs.forEach(doc => {
          doc.ref.update({
            serie: this.editDocumentFormGroup.get('serie').value.trim(),
            documentAlias: this.editDocumentFormGroup.get('alias').value.trim(),
            documentName: this.editDocumentFormGroup.get('name').value.trim()
          })
          .catch( err => {
            console.log(err);
          })
        });

        
      });*/

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

  confirmDelete(): void{
    var confirmDialogRef = this.dialog.open(ConfirmarBorrarDocumentoComponent, {
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

  confirmExtend():void {
    this.dialog.open(ExtenderCorrelativoComponent, {
      data: this.data,
      panelClass: 'ms-custom-dialogbox'
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
