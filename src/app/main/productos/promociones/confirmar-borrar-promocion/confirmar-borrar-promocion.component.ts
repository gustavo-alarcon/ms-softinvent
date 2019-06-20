import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { DatabaseService } from './../../../../core/database.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirmar-borrar-promocion',
  templateUrl: './confirmar-borrar-promocion.component.html',
  styles: []
})
export class ConfirmarBorrarPromocionComponent implements OnInit {

  loading = false;

  constructor(
    public dbs: DatabaseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<ConfirmarBorrarPromocionComponent>
  ) { }

  ngOnInit() {
  }

  delete(): void {
    this.loading = true;
    this.dbs.promotionsCollection
      .doc(this.data['promo']['id'])
      .delete()
      .then(() => {
        this.snackbar.open('Listo! ... promoción borrada', 'Cerrar', {
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
