import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';

@Component({
  selector: 'app-confirmar-borrar-producto',
  templateUrl: './confirmar-borrar-producto.component.html',
  styles: []
})
export class ConfirmarBorrarProductoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmarBorrarProductoComponent>,
    public dbs: DatabaseService
  ) { }

  ngOnInit() {
  }

  deleteProduct(): void {
    this.dbs.deleteProduct(this.data.id);
    this.dialogRef.close(true);
  }

}
