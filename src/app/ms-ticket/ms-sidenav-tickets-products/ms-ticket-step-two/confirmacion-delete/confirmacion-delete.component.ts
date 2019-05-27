import { Component, OnInit } from '@angular/core';
import { StateManagementService } from 'src/app/core/state-management.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmacion-delete',
  templateUrl: './confirmacion-delete.component.html',
  styles: []
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(
    private state: StateManagementService,
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
  ) { }

  ngOnInit() {
  }
  /*
  * @desc remove a product from the cart
  * @param {!product[]} actual product
  * @return { void } : Without returns
  */
  deleteProduct(product): void {
    this.state.deleteProduct(product);
    this.state.calcTotalSalePrice();
    this.dialogRef.close(true);
  }
  

}
