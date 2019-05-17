import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
export interface DialogData {
  name: string;
  sale: string;
  stock: string;
  warehouse: string;
  category: string;
}
@Component({
  selector: 'app-ms-ticket-dialog-product-movement',
  templateUrl: './ms-ticket-dialog-product-movement.component.html'
})
export class MsTicketDialogProductMovementComponent implements OnInit {
  cantidad = new FormControl() // valor actual del campo "cantidad"
  total: number = 0;
  constructor(
    public dialogRef: MatDialogRef<MsTicketDialogProductMovementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }
  ngOnInit() {
    // para modificar en tiempo real el precio total ( cantidad * precio)
    this.cantidad.valueChanges.subscribe(result => {
      console.log(this.cantidad);
      this.total = result * parseFloat(this.data.sale);
    });
  }
  /*Cuando hace click fuera del dialog*/
  onNoClick(): void {
    this.dialogRef.close();
  }
}
