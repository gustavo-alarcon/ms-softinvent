import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface DialogData {
  name: string;
  sale: string;
  stock: string;
}
@Component({
  selector: 'app-ms-ticket-dialog-product-movement',
  templateUrl: './ms-ticket-dialog-product-movement.component.html'
})

export class MsTicketDialogProductMovementComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MsTicketDialogProductMovementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }
  /*Cuando hace click fuera del dialog*/
  onNoClick(): void {
    this.dialogRef.close();
  }
}
