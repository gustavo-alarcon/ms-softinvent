import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ProductCart, Promo, Discount,Serie } from 'src/app/core/ms-types';
import { StateManagementService } from 'src/app/core/state-management.service';
import { ConfirmProductComponent } from 'src/app/ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-one/confirmacion-product/confirmacion-product.component';
import { ProductComponent } from 'src/app/productos/productos.component';
import { database } from 'firebase';

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
  nDescuento: number = 0; // precio en soles del descuento
  pDescuento: number = 0;// porcentaje del descuento
  pInicial: number = 0; // precio inicial sin descuentos
  cant: number = 0; // cantidad inicial
  total: number = 0; //precio total con descuentos y cantidades
  isPromo: boolean = false;
  isDiscount: boolean = false;
  listaPromos: string[] = ['Dia de la madre', "cierra puerta"];
  series : Serie[] = [{numero : 1 , seleccionado : "",estado: false},{numero : 2 ,seleccionado : "", estado: false},{numero : 3 ,seleccionado : "", estado: false},{numero : 4 , seleccionado : "",estado: false}];
  cantidadMaxima : number = 0;
  newProduct: ProductCart;
  promo: Promo;
  discount: Discount;
  i : number = this.carrito.currentState[this.carrito.currentStateIndex].cart.length+1; // indice del producto
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<MsTicketDialogProductMovementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public carrito: StateManagementService
  ) { }
  ngOnInit() {
    // para modificar en tiempo real el precio total ( cantidad * precio - (descuento | promocion))
    this.cantidad.valueChanges.subscribe(result => {
      this.cant = this.cantidad.value;
      if (this.cantidad.value) {
        this.total = result * (parseFloat(this.data.sale) - this.nDescuento);
        this.pInicial = result * parseFloat(this.data.sale);
        this.cantidadMaxima =this.cantidad.value;
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
    this.i++;
    var confirmDialogRef = this.dialog.open(ConfirmProductComponent, {
      data: {
        index: this.i,
        stock: parseInt(this.data.stock),
        name: this.data.name,
        discount: { amount: this.nDescuento * this.cant, percentage: this.pDescuento },
        quantity: this.cant,
        warehouse: this.data.warehouse,
        discountType: "discount",
        salePrice: (parseFloat(this.data.sale)-this.nDescuento ) * this.cant ,
        sale : parseFloat(this.data.sale),
        movement : this.dialogRef
      },
      panelClass: 'ms-custom-dialogbox'
    });

  }

  Disminuir(): void {
    if(this.cant > 0){ 
    this.cant = this.cant - 1
    this.total = this.cant * (parseFloat(this.data.sale) - this.nDescuento);
    this.pInicial = this.cant * parseFloat(this.data.sale);
    }
  }
  Aumentar(): void {
    if(this.cant < parseFloat(this.data.stock)){
    this.cant = this.cant + 1
    this.total = this.cant * (parseFloat(this.data.sale) - this.nDescuento);
    this.pInicial = this.cant * parseFloat(this.data.sale);
    }
  }
  DisminuirS(): void {
    if(this.nDescuento > 0) {
      if(this.nDescuento % 1 != 0){
        this.nDescuento =this.nDescuento +1 -(this.nDescuento%1);
      }
      this.nDescuento = this.nDescuento-1; parseInt
      this.pDescuento = (100*this.nDescuento)/parseFloat(this.data.sale);
      this.total = ((parseFloat(this.data.sale) - this.nDescuento) * this.cant);
      this.total = parseFloat(this.total.toFixed(2));
    }
  }
  AumentarS(): void {
    if(this.nDescuento < parseInt(this.data.sale)){
      if(this.nDescuento % 1 != 0){
        this.nDescuento =this.nDescuento -(this.nDescuento%1);
      }
      this.nDescuento = this.nDescuento+1
      this.pDescuento = parseFloat(((100*this.nDescuento)/parseFloat(this.data.sale)).toFixed(2));
      this.total = ((parseFloat(this.data.sale) - this.nDescuento) * this.cant);
      this.total = parseFloat(this.total.toFixed(2));
    }
  }
  DisminuirP(): void {
    if(this.pDescuento >0) {
      if(this.pDescuento % 1 != 0){
        this.pDescuento =this.pDescuento +1 -(this.pDescuento%1);
      }
      this.pDescuento = this.pDescuento-1
      this.nDescuento = parseFloat(((parseFloat(this.data.sale)*this.pDescuento)/100).toFixed(2));
      this.total = ((parseFloat(this.data.sale) - this.nDescuento) * this.cant);
      this.total = parseFloat(this.total.toFixed(2));
    }
  }
  AumentarP(): void {
    if(this.pDescuento < 100) {
      if(this.pDescuento % 1 != 0){
        this.pDescuento =this.pDescuento -(this.pDescuento%1);
      }
      this.pDescuento = this.pDescuento+1
      this.nDescuento = parseFloat(((parseFloat(this.data.sale)*this.pDescuento)/100).toFixed(2));
      this.total = ((parseFloat(this.data.sale) - this.nDescuento) * this.cant);
      this.total = parseFloat(this.total.toFixed(2));
    }
  }
  cantMax : number =0;

  onCheckbox(i) : void{
    if( this.series[i].seleccionado == ""){
      this.series[i].seleccionado = "checked";
      this.cantMax++;
    }
    else{
      this.series[i].seleccionado = "";
      this.cantMax--;
    }

    if(this.cantMax == this.cantidadMaxima){
     
      this.series.forEach((serie, index) => {
       serie.estado = true;
      });
    }
    else{
      this.series.forEach((serie, index) => {
        serie.estado = false;
       });
    }
    console.log(this.series);

    console.log("checked" + this.cantMax + "Cantidad "+this.cantidadMaxima);

  }
}
