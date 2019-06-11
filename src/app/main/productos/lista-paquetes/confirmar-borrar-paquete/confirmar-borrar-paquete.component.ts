import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmar-borrar-paquete',
  templateUrl: './confirmar-borrar-paquete.component.html'
})
export class ConfirmarBorrarPaqueteComponent implements OnInit {
  loading = false;

  constructor(
    public dbs: DatabaseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<ConfirmarBorrarPaqueteComponent>
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  delete(): void {
    this.loading = true;
    this.dbs.packagesCollection
      .doc(this.data['paquete']['id'])
      .delete()
      .then(() => {
        this.snackbar.open('Listo! ... paquete borrado', 'Cerrar', {
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
