import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EditTicketComponent } from '../editar-ticket/editar-ticket.component';
import { ProductCart, Discount } from 'src/app/core/ms-types';
import { StateManagementService } from 'src/app/core/state-management.service';

export interface DialogData {
  index: number,
  stock: string;
  name: string;
  discount: Discount;
  quantity: number;
  warehouse: string;
  discountType: string;
  salePrice: string;
  sale: number;
  editar : MatDialogRef<EditTicketComponent>;
}

@Component({
  selector: 'app-confirmacion-edit',
  templateUrl: './confirmacion-edit.component.html',
  styles: []
})
export class ConfirmEditComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public state: StateManagementService,
    public dialogRef: MatDialogRef<ConfirmEditComponent>,
  ) { }

  ngOnInit() {
  }
  /*
  * @desc  edit the product info in the current ticket 
  * @return { void } : Without returns
  */
  editProduct(): void {
    let newProduct: ProductCart;
    newProduct = {
      index : this.data.index,
      stock: parseInt(this.data.stock),
      name: this.data.name,
      discount: this.data.discount,
      quantity: this.data.quantity,
      warehouse: this.data.warehouse,
      discountType: "discount",
      salePrice: parseFloat(this.data.salePrice),
      sale: this.data.sale
    };
    this.state.editProduct(newProduct)
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
