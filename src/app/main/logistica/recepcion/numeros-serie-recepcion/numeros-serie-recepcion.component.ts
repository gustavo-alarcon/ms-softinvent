import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';
import { TransferProduct, Transfer } from 'src/app/core/ms-types';
import { Observable } from 'rxjs';
import { ProductComponent } from 'src/app/main/productos/productos.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-numeros-serie-recepcion',
  templateUrl: './numeros-serie-recepcion.component.html',
  styles: []
})
export class NumerosSerieRecepcionComponent implements OnInit {

  loading = false;
  serialList: Observable<TransferProduct[]>;

  constructor(
    public dbs: DatabaseService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<NumerosSerieRecepcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { transfer: Transfer, product: TransferProduct}
  ) { }

  ngOnInit() {
    this.loading = true;
    this.serialList =
      this.dbs.getProductSerialList(this.data.transfer.id, this.data.product.id)
        .pipe(
          tap(res => {
            console.log(res);
            this.loading = false
          })
        );
  }

  save(): void {

  }

}
