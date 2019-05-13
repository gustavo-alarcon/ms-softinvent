import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';

@Component({
  selector: 'app-confirmar-borrar-tercero',
  templateUrl: './confirmar-borrar-tercero.component.html',
  styles: []
})
export class ConfirmarBorrarTerceroComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmarBorrarTerceroComponent>,
    public dbs: DatabaseService
  ) { }

  ngOnInit() {
  }

  deleteParty(): void {
    this.dbs.deleteParty(this.data.id);
    this.dialogRef.close(true);
  }

}
