import { Component, OnInit, Inject } from '@angular/core';
import { ProductCart, Discount } from 'src/app/core/ms-types';
import { StateManagementService } from 'src/app/core/state-management.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MsTicketDialogProductMovementComponent } from '../ms-ticket-dialog-product-movement/ms-ticket-dialog-product-movement.component';
export interface DialogData {
  stock: string;
  name: string;
  discount: Discount;
  quantity: number;
  warehouse: string;
  discountType: string;
  salePrice: string;
  sale:number;
}

@Component({
  selector: 'app-confirmacion-product',
  templateUrl: './confirmacion-product.component.html',
  styles: []
})

export class ConfirmacionProductComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public carrito: StateManagementService,
    public dialogRef: MatDialogRef<ConfirmacionProductComponent>,
    public venta  :  MatDialogRef<MsTicketDialogProductMovementComponent>,
  ) { }

  ngOnInit() {
  }

  addProduct(): void {
    console.log(this.data);

    let newProduct: ProductCart;
    newProduct = {
      stock: parseInt(this.data.stock),
      name: this.data.name,
      discount: this.data.discount,
      quantity: this.data.quantity,
      warehouse: this.data.warehouse,
      discountType: "discount",
      salePrice: parseFloat(this.data.salePrice),
      sale: this.data.sale
    };
    this.carrito.agregarProducto(newProduct)
    this.onNoClick();
    this.onNoClick2();


  }
  onNoClick(): void {
    this.dialogRef.close();

  }
  onNoClick2(): void {
    this.venta.close();

  }
}
