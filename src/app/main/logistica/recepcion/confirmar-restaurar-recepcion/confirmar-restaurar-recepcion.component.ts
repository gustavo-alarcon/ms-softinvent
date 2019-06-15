import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Transfer } from 'src/app/core/ms-types';

@Component({
  selector: 'app-confirmar-restaurar-recepcion',
  templateUrl: './confirmar-restaurar-recepcion.component.html',
  styles: []
})
export class ConfirmarRestaurarRecepcionComponent implements OnInit {

  loading = false;

  constructor(
    public dbs: DatabaseService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<ConfirmarRestaurarRecepcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Transfer
  ) { }

  ngOnInit() {
  }

  restore(): void{
    this.dbs.transfersCollection
    .doc(this.data.id)
    .update({status: 'Enviado'})
      .then(() => {
        this.loading = false;
        this.snackbar.open('Transferencia restaurada', 'Cerrar', {
          duration: 6000
        });
        this.dialogRef.close(true);
      })
      .catch(err => {
        console.log(err);
        this.loading = false;
        this.snackbar.open('Ups!...parece que hubo un error', 'Cerrar', {
          duration: 6000
        });
      });
  }
}
