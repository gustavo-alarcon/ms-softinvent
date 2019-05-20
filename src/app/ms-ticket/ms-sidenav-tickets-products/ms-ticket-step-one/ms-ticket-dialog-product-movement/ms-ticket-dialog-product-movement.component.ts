import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ProductCart, Promo, Discount, Ticket } from 'src/app/core/ms-types';
import { StateManagementService } from 'src/app/core/state-management.service'
import { ProductosComponent } from 'src/app/productos/productos.component';

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
  /**Valor actual de las siguiente variables :
  * Cantidad
  * Descuento
  * Promocion
  */
  cantidad = new FormControl()
  descuento = new FormControl()
  promocion = new FormControl()
  porcentajeDescuento = new FormControl() // valor actual del campo "promocion"
  nDescuento: number = 0; // prcio en soles del descuento
  pDescuento: number = 0;// porcentaje del descuento
  pInicial: number = 0; // precio inicial sin descuentos
  cant: number = 1; // cantidad inicial
  total: number = 0; //precio total con descuentos y cantidades
  isPromo: boolean = false;
  isDiscount: boolean = false;
  listaPromos: string[] = ['Dia de la madre', "cierra puerta"];
  newProduct: ProductCart;
  promo: Promo;
  discount: Discount;
  constructor(
    public dialogRef: MatDialogRef<MsTicketDialogProductMovementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public carrito: StateManagementService
  ) {
    this.total = parseFloat(this.data.sale) * 1;
    console.log('consoleee');
  }
  ngOnInit() {
    // para modificar en tiempo real el precio total ( cantidad * precio - (descuento | promocion))
    this.cantidad.valueChanges.subscribe(result => {
      this.cant = this.cantidad.value;
      if (this.cantidad.value != '') {
        this.total = result * (parseFloat(this.data.sale) - this.nDescuento);
        this.pInicial = result * parseFloat(this.data.sale);
      }
      else {
        this.total = 0;
      }
    });
    this.descuento.valueChanges.subscribe(result => {
      this.total = ((parseFloat(this.data.sale) - result) * this.cant);
      this.pDescuento = parseFloat(((100 * result) / parseInt(this.data.sale)).toFixed(2));
      this.nDescuento = this.descuento.value;
    });
    this.porcentajeDescuento.valueChanges.subscribe(result => {
      this.nDescuento = (parseInt(this.data.sale) * result) / 100;
      this.total = ((parseFloat(this.data.sale) - this.nDescuento) * this.cant);
      this.total = parseFloat(this.total.toFixed(2));
    });

  }
  /*Cuando hace click fuera del dialog*/
  onNoClick(): void {
    this.dialogRef.close();
  }
  /**
  * @desc  agrega un nuevo producto al carrito
  * @return { void } : Sin retornos
  */
  addProduct(): void {
    this.newProduct = {
      stock: parseInt(this.data.stock),
      name: this.data.name,
      discount: { amount: this.nDescuento * this.cant, percentage: this.pDescuento },
      quantity: this.cant,
      warehouse: this.data.warehouse,
      discountType: "discount",
      salePrice: parseFloat(this.data.sale)
    };
    this.carrito.agregarProducto(this.newProduct)
    console.log(this.newProduct);
  }
}
