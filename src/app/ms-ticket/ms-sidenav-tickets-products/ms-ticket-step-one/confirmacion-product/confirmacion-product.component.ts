import { Component, OnInit, Inject } from '@angular/core';
import { ProductCart, Discount } from 'src/app/core/ms-types';
import { StateManagementService } from 'src/app/core/state-management.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { MsTicketDialogProductMovementComponent } from '../ms-ticket-dialog-product-movement/ms-ticket-dialog-product-movement.component';
export interface DialogData {
  index: number;
  stock: string;
  name: string;
  discount: Discount;
  quantity: number;
  warehouse: string;
  discountType: string;
  salePrice: string;
  sale: number;
  movement : MatDialogRef<MsTicketDialogProductMovementComponent>;
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
    public venta: MatDialog,
  ) { }

  ngOnInit() {
  }

  addProduct(): void {
    let newProduct: ProductCart;
    newProduct = {
      index: this.data.index,
      stock: parseInt(this.data.stock),
      name: this.data.name,
      discount: this.data.discount,
      quantity: this.data.quantity,
      warehouse: this.data.warehouse,
      discountType: "discount",
      salePrice: parseFloat(this.data.salePrice),
      sale: this.data.sale
    };
    this.carrito.addProducto(newProduct)
    this.onNoClick();
    this.data.movement.close();

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
