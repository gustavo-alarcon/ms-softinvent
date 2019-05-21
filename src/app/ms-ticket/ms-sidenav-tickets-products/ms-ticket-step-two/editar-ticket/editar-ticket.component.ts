import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ProductCart, Promo, Discount } from 'src/app/core/ms-types';
import { StateManagementService } from 'src/app/core/state-management.service'
import { ConfirmacionEditComponent } from 'src/app/ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-two/confirmacion-edit/confirmacion-edit.component';

export interface DialogData {
  name: string,
  sale: string,
  salePrice: string,
  stock: number,
  category: string,
  warehouse:string,
  imagePath: string,
  quantity : number,
  discountType : string,
  discount : Discount,
  total : string,
}
@Component({
  selector: 'app-editar-ticket',
  templateUrl: './editar-ticket.component.html',
  styles: []
})
export class EditarTicketComponent implements OnInit {
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
  cant: number = 0; // cantidad inicial
  total: number = 0; //precio total con descuentos y cantidades
  isPromo: boolean = false;
  isDiscount: boolean = false;
  listaPromos: string[] = ['Dia de la madre', "cierra puerta"];
  newProduct: ProductCart;
  promo: Promo;
  discount: Discount;
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EditarTicketComponent>,
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
      stock: this.data.stock,
      name: this.data.name,
      discount: { amount: this.nDescuento * this.cant, percentage: this.pDescuento },
      quantity: this.cant,
      warehouse: this.data.warehouse,
      discountType: "discount",
      salePrice: parseFloat(this.data.salePrice),
      sale: parseFloat(this.data.sale)
    };
    this.carrito.agregarProducto(this.newProduct)
    console.log(this.newProduct);
  }
  confirmacionProduct():void {
    var confirmDialogRef = this.dialog.open(ConfirmacionEditComponent, {
      panelClass: 'ms-custom-modalbox'
    });
    confirmDialogRef.afterClosed()
    }
}
