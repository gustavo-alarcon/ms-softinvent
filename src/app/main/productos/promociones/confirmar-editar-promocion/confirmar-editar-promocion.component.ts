import { PromoProduct } from './../../../../core/ms-types';
import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmar-editar-promocion',
  templateUrl: './confirmar-editar-promocion.component.html',
  styles: []
})
export class ConfirmarEditarPromocionComponent implements OnInit {

  loading = false;

  constructor(
    public dbs: DatabaseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<ConfirmarEditarPromocionComponent>
  ) { }

  ngOnInit() {
  }

  save(): void {
    this.loading = true;
    this.dbs.promotionsCollection
      .doc(this.data['promo']['id'])
      .set(this.data['promo'], { merge: true })
      .then(() => {
        this.data['promoProducts'].forEach(item => {
          const coincidence = this.data['referenceProducts'].filter(reference => reference['id'] === item['id']);
          if (coincidence.length) {
            this.dbs.promotionsCollection
              .doc(this.data['promo']['id'])
              .collection('products')
              .doc(item['id'])
              .set(item, { merge: true })
              .catch(err => {
                console.log(err);
                this.snackbar.open('Ups!...parece que hubo un error', 'Cerrar', {
                  duration: 6000
                });
              });
          } else {
            this.dbs.promotionsCollection
              .doc(this.data['promo']['id'])
              .collection('products')
              .add(item)
              .then(ref => {
                ref.update({ id: ref.id });
              })
              .catch(err => {
                console.log(err);
                this.snackbar.open('Ups!...parece que hubo un error', 'Cerrar', {
                  duration: 6000
                });
              });
          }

        });
        this.loading = false;
        this.snackbar.open('Listo!', 'Cerrar', {
          duration: 6000
        });
        this.dialogRef.close(true);
      })
      .catch(err => {
        console.log(err);
        this.snackbar.open('Ups!...parece que hubo un error', 'Cerrar', {
          duration: 6000
        });
      });
  }

}
