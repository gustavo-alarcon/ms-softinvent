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

  editItemsList(editedList: PromoProduct[], referenceList: PromoProduct[]): void {

    // looking for added items
    const mapRef = referenceList.map(ref => ref.itemId);

    editedList.forEach(item => {
      const coincidence = mapRef.indexOf(item.itemId);
      if (coincidence < 0) {
        this.dbs.promotionsCollection
          .doc(this.data['promoId'])
          .collection('products')
          .add(item)
          .then(ref => {
            ref.set({ id: ref.id }, { merge: true });
          })
          .catch(err => {
            console.log(err);
            this.snackbar.open('Ups!...parece que hubo un error', 'Cerrar', {
              duration: 6000
            });
          });
      }
    });

    // looking for removed items
    const mapEdited = editedList.map(ref => ref.itemId);

    referenceList.forEach(item => {
      const coincidence = mapEdited.indexOf(item.itemId);
      if (coincidence < 0) {
        this.dbs.promotionsCollection
          .doc(this.data['promoId'])
          .collection('products')
          .doc(item.id)
          .delete();
      }
    });

    this.loading = false;
    this.snackbar.open('Listo!', 'Cerrar', {
      duration: 6000
    });
    this.dialogRef.close(true);

  }

  save(): void {
    this.loading = true;
    this.dbs.promotionsCollection
      .doc(this.data['promoId'])
      .set(this.data['promo'], { merge: true })
      .then(() => {
        this.editItemsList(this.data['promoProducts'], this.data['referenceProducts']);

      })
      .catch(err => {
        console.log(err);
        this.snackbar.open('Ups!...parece que hubo un error', 'Cerrar', {
          duration: 6000
        });
      });
  }

}
