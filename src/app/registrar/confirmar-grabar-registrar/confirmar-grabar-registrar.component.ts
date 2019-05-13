import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmarLimpiarRegistrarComponent } from '../confirmar-limpiar-registrar/confirmar-limpiar-registrar.component';
import { DatabaseService } from 'src/app/core/database.service';

@Component({
  selector: 'app-confirmar-grabar-registrar',
  templateUrl: './confirmar-grabar-registrar.component.html',
  styles: []
})
export class ConfirmarGrabarRegistrarComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmarLimpiarRegistrarComponent>,
    public dbs: DatabaseService
  ) { }

  ngOnInit() {
  }

  saveMovement(): void {
    this.dbs.saveMovement(this.data[0], this.data[1], this.data[2], this.data[3], this.data[4], this.data[5]);
    this.dialogRef.close();
  }

}
