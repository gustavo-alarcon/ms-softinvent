import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface DialogData {
  imagePath: string;
  description: string;
}
@Component({
  selector: 'app-ms-ticket-dialog-product-description',
  templateUrl: './ms-ticket-dialog-product-description.component.html',
  styles: []
})

export class MsTicketDialogProductDescriptionComponent implements OnInit {

  imageProd = null;
  
  constructor(
    public dialogRef: MatDialogRef<MsTicketDialogProductDescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }
  /* Cuando haga click fuera del dialog*/
  onNoClick(): void {
    this.dialogRef.close();
  }
}
