import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';
import { Transfer } from 'src/app/core/ms-types';

@Component({
  selector: 'app-confirmar-rechazar-recepcion',
  templateUrl: './confirmar-rechazar-recepcion.component.html',
  styles: []
})
export class ConfirmarRechazarRecepcionComponent implements OnInit {

  loading = false;

  constructor(
    public dbs: DatabaseService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<ConfirmarRechazarRecepcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Transfer
  ) { }

  ngOnInit() {
  }

  reject(): void {
    this.loading = true;

    this.dbs.transfersCollection
      .doc(this.data.id)
      .update({status: 'Rechazado'})
        .then(() => {
          this.snackbar.open('Transferencia rechazada', 'Cerrar', {
            duration: 6000
          });
          this.loading = false;
          this.dialogRef.close(true);
        })
        .catch(err => {
          console.log(err);
          this.snackbar.open('Ups!...parece que hubo un error', 'Cerrar', {
            duration: 6000
          });
          this.loading = false;
        });
  }

}
