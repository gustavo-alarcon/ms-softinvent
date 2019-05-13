import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';

@Component({
  selector: 'app-confirmar-borrar-almacen',
  templateUrl: './confirmar-borrar-almacen.component.html',
  styles: []
})
export class ConfirmarBorrarAlmacenComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmarBorrarAlmacenComponent>,
    public dbs: DatabaseService
  ) { }

  ngOnInit() {
  }

  deleteWarehouse(): void {
    this.dbs.deleteWarehouse(this.data.id);
    this.dialogRef.close(true);
  }

}
