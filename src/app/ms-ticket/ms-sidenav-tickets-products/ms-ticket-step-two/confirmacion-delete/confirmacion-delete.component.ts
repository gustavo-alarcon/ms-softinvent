import { Component, OnInit, Inject } from '@angular/core';
import { StateManagementService } from 'src/app/core/state-management.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductCart } from 'src/app/core/ms-types';

@Component({
  selector: 'app-confirmacion-delete',
  templateUrl: './confirmacion-delete.component.html',
  styles: []
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(
    private state: StateManagementService,
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject (MAT_DIALOG_DATA) public data: ProductCart
  ) { }

  ngOnInit() {
  }
  /*
  * @desc remove a product from the cart
  * @param {!product[]} actual product
  * @return { void } : Without returns
  */
  deleteProductYes(): void {
    console.log('index', this.data.index)
    this.state.deleteProduct(this.data.index);
    this.state.calcTotalSalePrice();
    this.dialogRef.close(true);
  }
  

}
