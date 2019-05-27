import { Component, OnInit } from '@angular/core';
import { StateManagementService } from 'src/app/core/state-management.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmacion-delete',
  templateUrl: './confirmacion-delete.component.html',
  styles: []
})
export class ConfirmacionDeleteComponent implements OnInit {

  constructor(
    private state: StateManagementService,
    public dialogRef: MatDialogRef<ConfirmacionDeleteComponent>,
  ) { }

  ngOnInit() {
  }
  /*
  * @desc remove a product from the cart
  * @param {!producto[]} actual product
  * @return { void } : Without returns
  */
  deleteProduct(product): void {
    this.state.eliminarProducto(product);
    this.state.calcTotalSalePrice();
    this.dialogRef.close(true);
  }
  

}
