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
  imageProd = null
  quantityFC = new FormControl();
  discountFC = new FormControl();
  serieList = new FormControl();
  promocion = new FormControl()
  discountPercentageFC = new FormControl() // valor actual del campo "promocion"
  discountNumber: number = this.data.discount.amount / this.data.quantity; // prcio en soles del descuento
  discountPercentage: number = this.data.discount.percentage;// porcentaje del descuento
  initPrice: number = parseFloat(this.data.sale) * this.data.quantity; // precio inicial sin descuentos
  initQuantity: number = this.data.quantity; // cantidad inicial
  total: number = parseFloat(this.data.salePrice);//precio total con descuentos y cantidades
  maxQuantityTemp: number = 0; // cantida maxima temporal conforme se marcan los numeros de serie
  listaPromos: string[] = ['Dia de la madre', "cierra puerta"];
  newProduct: ProductCart;
  promo: Promo;
  discount: Discount;
  enableAddProd: boolean = false;
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EditTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public carrito: StateManagementService
  ) { }
  ngOnInit() {
    // para modificar en tiempo real el precio total ( cantidad * precio - (descuento | promocion))
    this.quantityFC.valueChanges.subscribe(result => {
      this.initQuantity = this.quantityFC.value;
      if (this.quantityFC.value != '') {
        this.total = result * (parseFloat(this.data.sale) - this.discountNumber);
        this.initPrice = result * parseFloat(this.data.sale);
        this.enableAddProd = !(result > this.data.stock);
      }
      else {
        this.total = 0;
      }
    });
    this.discountFC.valueChanges.subscribe(result => {
      this.total = ((parseFloat(this.data.sale) - result) * this.initQuantity);
      this.discountPercentage = parseFloat(((100 * result) / parseInt(this.data.sale)).toFixed(2));
      this.discountNumber = this.discountFC.value;
    });
    this.discountPercentageFC.valueChanges.subscribe(result => {
      this.discountNumber = (parseInt(this.data.sale) * result) / 100;
      this.total = ((parseFloat(this.data.sale) - this.discountNumber) * this.initQuantity);
      this.total = parseFloat(this.total.toFixed(2));
    });
  }
  /**
    * @desc  Cuando se hace click fuera de dialog
    * @return { void } : Without returns
    */
  onNoClick(): void {
    this.dialogRef.close();
  }
  /**
   * @desc  Abre el dialog si desea confirmar producto
   * @return { void } : Without returns
   */
  confirmacionProduct(): void {
    var confirmDialogRef = this.dialog.open(ConfirmEditComponent, {
      data: {
        index: this.data.index,
        stock: this.data.stock,
        name: this.data.name,
        discount: { amount: this.discountNumber * this.initQuantity, percentage: this.discountPercentage },
        quantity: this.initQuantity,
        warehouse: this.data.warehouse,
        discountType: "discount",
        salePrice: (parseFloat(this.data.sale) - this.discountNumber) * this.initQuantity,
        sale: parseFloat(this.data.sale),
        editar: this.dialogRef
      },
      panelClass: 'ms-custom-dialogbox'

    }).afterClosed().subscribe(res => {
      if (res) { this.dialogRef.close() }
    })
  }
}
