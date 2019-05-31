import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ProductCart, Promo, Discount } from 'src/app/core/ms-types';
import { StateManagementService } from 'src/app/core/state-management.service'
import { ConfirmEditComponent } from 'src/app/ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-two/confirmacion-edit/confirmacion-edit.component';

export interface DialogData {
  index: number,
  name: string,
  sale: string,
  salePrice: string,
  stock: number,
  category: string,
  warehouse: string,
  imagePath: string,
  quantity: number,
  discountType: string,
  discount: Discount,
  total: string,
}
@Component({
  selector: 'app-editar-ticket',
  templateUrl: './editar-ticket.component.html',
  styles: []
})
export class EditTicketComponent implements OnInit {
  /**Valor actual de las siguiente variables :
  * Cantidad
  * Descuento
  * Promocion
  */
  imageProd = null
  cantidad = new FormControl()
  descuento = new FormControl()
  promocion = new FormControl()
  porcentajeDescuento = new FormControl() // valor actual del campo "promocion"
  nDescuento: number = this.data.discount.amount / this.data.quantity; // prcio en soles del descuento
  pDescuento: number = this.data.discount.percentage;// porcentaje del descuento
  pInicial: number = parseFloat(this.data.sale) * this.data.quantity; // precio inicial sin descuentos
  cant: number = this.data.quantity; // cantidad inicial
  total: number = parseFloat(this.data.salePrice);//precio total con descuentos y cantidades
  isPromo: boolean = false;
  isDiscount: boolean = false;
  listaPromos: string[] = ['Dia de la madre', "cierra puerta"];
  newProduct: ProductCart;
  promo: Promo;
  discount: Discount;
  enableAddProd : boolean = false; 
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EditTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public carrito: StateManagementService
  ) { }
  ngOnInit() {
    // para modificar en tiempo real el precio total ( cantidad * precio - (descuento | promocion))
    this.cantidad.valueChanges.subscribe(result => {
      this.cant = this.cantidad.value;
      if (this.cantidad.value != '') {
        this.total = result * (parseFloat(this.data.sale) - this.nDescuento);
        this.pInicial = result * parseFloat(this.data.sale);
        this.enableAddProd =!(result >this.data.stock);

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
  confirmacionProduct(): void {
    var confirmDialogRef = this.dialog.open(ConfirmEditComponent, {
      data: {
        index: this.data.index,
        stock: this.data.stock,
        name: this.data.name,
        discount: { amount: this.nDescuento * this.cant, percentage: this.pDescuento },
        quantity: this.cant,
        warehouse: this.data.warehouse,
        discountType: "discount",
        salePrice: (parseFloat(this.data.sale) - this.nDescuento) * this.cant,
        sale: parseFloat(this.data.sale),
        editar: this.dialogRef
      },
      panelClass: 'ms-custom-dialogbox'

    }).afterClosed().subscribe(res => {
      if (res) { this.dialogRef.close() }
    })
  }
}
