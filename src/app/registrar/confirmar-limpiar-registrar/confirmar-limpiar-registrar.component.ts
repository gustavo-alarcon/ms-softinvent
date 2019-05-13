import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';

@Component({
  selector: 'app-confirmar-limpiar-registrar',
  templateUrl: './confirmar-limpiar-registrar.component.html',
  styles: []
})
export class ConfirmarLimpiarRegistrarComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmarLimpiarRegistrarComponent>,
    public dbs: DatabaseService
  ) { }

  ngOnInit() {
  }

  cleanList(): void {
    this.dbs.cleanList();
    this.dialogRef.close();
  }

}
