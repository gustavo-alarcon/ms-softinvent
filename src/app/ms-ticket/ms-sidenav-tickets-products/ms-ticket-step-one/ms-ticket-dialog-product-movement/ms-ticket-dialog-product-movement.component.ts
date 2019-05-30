import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ProductCart, Promo, Discount, Serie } from 'src/app/core/ms-types';
import { StateManagementService } from 'src/app/core/state-management.service';
import { ConfirmProductComponent } from 'src/app/ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-one/confirmacion-product/confirmacion-product.component';
import { ProductComponent } from 'src/app/productos/productos.component';
import { database } from 'firebase';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';

export interface DialogData {
  name: string;
  sale: string;
  stock: string;
  warehouse: string;
  category: string;
  quantity: number;
  salePrice: number;

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
  imageProd = null
  cantidad = new FormControl()
  descuento = new FormControl()
  promocion = new FormControl()
  serieList = new FormControl()
  filteredSeries: Observable<Serie[]>;
  selection = new SelectionModel<Serie>(true, []);

  porcentajeDescuento = new FormControl() // valor actual del campo "promocion"
  nDescuento: number = 0; // precio en soles del descuento
  pDescuento: number = 0;// porcentaje del descuento
  pInicial: number = 0; // precio inicial sin descuentos
  cant: number = 0; // cantidad inicial
  total: number = 0; //precio total con descuentos y cantidades
  isPromo: boolean = false;
  isDiscount: boolean = false;
  listaPromos: string[] = ['Dia de la madre', "cierra puerta"];
  series: Serie[] = [
    { numero: 1, seleccionado: false, estado: false },
    { numero: 2, seleccionado: false, estado: false },
    { numero: 3, seleccionado: false, estado: false },
    { numero: 4, seleccionado: false, estado: false }];

  cantidadMaxima: number = 0;
  newProduct: ProductCart;
  promo: Promo;
  discount: Discount;
  i: number = this.carrito.currentState[this.carrito.currentStateIndex].cart.length; // indice del producto

  sMarcados: number = 0;
  aumento: boolean = false;
  disminuye: boolean = false;
  
  PriceInicial: number = 0;
  enableAddProd = false;
  
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<MsTicketDialogProductMovementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public carrito: StateManagementService
  ) { }

  ngOnInit() {
    // para modificar en tiempo real el precio total ( cantidad * precio - (descuento | promocion))
    this.cantidad.valueChanges.subscribe(result => {
      this.cant = result;
      if (result) {
        this.total = result * (parseFloat(this.data.sale) - this.nDescuento);
        this.pInicial = result * parseFloat(this.data.sale);
        this.cantidadMaxima = result;
        this.enableAddProd = !(result > this.data.stock);
      }
      else {
        this.total = 0;
      }
      for (var _i = 0; _i < this.series.length; _i++) {
        this.series[_i].estado = true;

      }
      for (var _i = 0; _i < this.cantidad.value; _i++) {
        this.selection.select( this.series[_i]);
        
        this.series[_i].estado = false;

      }

      this.cantMax = this.cantidad.value;
      console.log(this.series);
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
    this.filteredSeries = this.serieList.valueChanges
      .pipe(
        startWith(''),
        map(serie => serie ? this._filterSeries(serie.toString()) : this.series.slice())
      );
  }
  private _filterSeries(value: string): Serie[] {
    const filterValue = value;
    return this.series.filter(serie => serie.numero.toString().indexOf(filterValue) === 0);
  }
  /*Cuando hace click fuera del dialog*/
  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmacionProduct(): void {
    
    var confirmDialogRef = this.dialog.open(ConfirmProductComponent, {
      data: {
        index: this.i,
        stock: parseInt(this.data.stock),
        name: this.data.name,
        discount: { amount: this.nDescuento * this.cant, percentage: this.pDescuento },
        quantity: this.cant,
        warehouse: this.data.warehouse,
        discountType: "discount",
        salePrice: (parseFloat(this.data.sale) - this.nDescuento) * this.cant,
        sale: parseFloat(this.data.sale),
        movement: this.dialogRef
      },
      
      panelClass: 'ms-custom-dialogbox'

    });
this.i++;
  }

  Disminuir(): void {
    if (this.cant > 0) {
      this.cant = this.cant - 1
      this.total = this.cant * (parseFloat(this.data.sale) - this.nDescuento);
      this.pInicial = this.cant * parseFloat(this.data.sale);
      this.cantidad.setValue( this.cant)
    }
  }
  Aumentar(): void {
    if (this.cant < parseFloat(this.data.stock)) {
      this.cant = this.cant + 1
      this.total = this.cant * (parseFloat(this.data.sale) - this.nDescuento);
      this.pInicial = this.cant * parseFloat(this.data.sale);
      this.cantidad.setValue( this.cant);
    }
  }
  DisminuirS(): void {
    if (this.nDescuento > 0) {
      if (this.nDescuento % 1 != 0) {
        this.nDescuento = this.nDescuento + 1 - (this.nDescuento % 1);
      }
      this.nDescuento = this.nDescuento - 1; parseInt
      this.pDescuento = (100 * this.nDescuento) / parseFloat(this.data.sale);
      this.total = ((parseFloat(this.data.sale) - this.nDescuento) * this.cant);
      this.total = parseFloat(this.total.toFixed(2));
    }
  }
  AumentarS(): void {
    if (this.nDescuento < parseInt(this.data.sale)) {
      if (this.nDescuento % 1 != 0) {
        this.nDescuento = this.nDescuento - (this.nDescuento % 1);
      }
      this.nDescuento = this.nDescuento + 1
      this.pDescuento = parseFloat(((100 * this.nDescuento) / parseFloat(this.data.sale)).toFixed(2));
      this.total = ((parseFloat(this.data.sale) - this.nDescuento) * this.cant);
      this.total = parseFloat(this.total.toFixed(2));
    }
  }
  DisminuirP(): void {
    if (this.pDescuento > 0) {
      if (this.pDescuento % 1 != 0) {
        this.pDescuento = this.pDescuento + 1 - (this.pDescuento % 1);
      }
      this.pDescuento = this.pDescuento - 1
      this.nDescuento = parseFloat(((parseFloat(this.data.sale) * this.pDescuento) / 100).toFixed(2));
      this.total = ((parseFloat(this.data.sale) - this.nDescuento) * this.cant);
      this.total = parseFloat(this.total.toFixed(2));
    }
  }
  AumentarP(): void {
    if (this.pDescuento < 100) {
      if (this.pDescuento % 1 != 0) {
        this.pDescuento = this.pDescuento - (this.pDescuento % 1);
      }
      this.pDescuento = this.pDescuento + 1
      this.nDescuento = parseFloat(((parseFloat(this.data.sale) * this.pDescuento) / 100).toFixed(2));
      this.total = ((parseFloat(this.data.sale) - this.nDescuento) * this.cant);
      this.total = parseFloat(this.total.toFixed(2));
    }
  }
  cantMax: number = 0;
  
  changeValue( i ) : void {
      if (this.selection.isSelected(i) == false) {
        this.cantMax++;
      }
      else {
        this.cantMax--;
      }
      this.selection.toggle(i);  
      if (this.cantMax >= this.cantidadMaxima) {
        this.series.forEach((serie, indice) => {
          if(this.selection.isSelected(serie) == false){
            serie.estado = true;
          }
        });
      }
      else {
        this.series.forEach((serie, i) => {
          serie.estado = false;
        });
      }
  }
}
