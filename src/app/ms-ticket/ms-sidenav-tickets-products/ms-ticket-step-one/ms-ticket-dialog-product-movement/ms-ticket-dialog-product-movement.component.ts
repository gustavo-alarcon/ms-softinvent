import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ProductCart, Promo, Discount, serialNumber } from 'src/app/core/ms-types';
import { StateManagementService } from 'src/app/core/state-management.service';
import { ConfirmProductComponent } from 'src/app/ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-one/confirmacion-product/confirmacion-product.component';
import { Observable, of, Subscriber, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { database } from 'firebase';
export interface DialogData {
  name: string;
  sale: string;
  stock: string;
  warehouse: string;
  category: string;
  quantity: number;
  salePrice: number;
  serialNumbers: Array<serialNumber>;
  maxDiscount: number;
}
@Component({
  selector: 'app-ms-ticket-dialog-product-movement',
  templateUrl: './ms-ticket-dialog-product-movement.component.html'
})
export class MsTicketDialogProductMovementComponent implements OnInit, OnDestroy {

  listaPromos = [];
  imageProd = null
  quantityFC = new FormControl();
  discountFC = new FormControl();
  serieList = new FormControl();
  promocion = new FormControl();
  filteredSeries: Observable<serialNumber[]>;
  selection = new SelectionModel<serialNumber>(true, []);
  discountPercentageFC = new FormControl() // valor actual del campo "promocion"
  discountNumber: number = 0; // precio en soles del descuento
  discountPercentage: number = 0;// porcentaje del descuento
  initPrice: number = 0; // precio inicial sin descuentos
  initQuantity: number = 0; // cantidad inicial
  total: number = 0; //precio total con descuentos y cantidades
  maxQuantityTemp: number = 0; // cantida maxima temporal conforme se marcan los numeros de serie
  quantity: number = 0;
  isPromo: boolean = false;
  isEmpty: boolean = false;
  isDiscount: boolean = false;
  max: number = 0;
  maxDiscount : number = this.data.maxDiscount * parseInt(this.data.sale) / 100;
  newProduct: ProductCart;
  promo: Promo;
  discount: Discount;
  i: number = this.carrito.currentState[this.carrito.currentStateIndex].cart.length + 1; // indice del producto
  enableAddProd = false;
  firstFilteredSerie: serialNumber = this.data.serialNumbers[0];

  suscribe: Array<Subscription> = [];
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<MsTicketDialogProductMovementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public carrito: StateManagementService
  ) { }

  ngOnInit() {
    // para cuando se modifica en tiempo real la cantidad 
    this.quantityFC.valueChanges.subscribe(result => {
      this.initQuantity = result;
      this.selection.clear();
      if (result) {
        this.total = result * (parseFloat(this.data.sale) - this.discountNumber);
        this.initPrice = result * parseFloat(this.data.sale);
        this.quantity = result;
        this.enableAddProd = !(result > this.data.stock);
        // this.enableAddProd = !!result;
      }
      else {
        this.total = 0;
      }
      for (var _i = 0; _i < this.data.serialNumbers.length; _i++) {
        this.data.serialNumbers[_i].activated = true;
      }
      for (var _i = 0; _i < this.quantityFC.value; _i++) {
        this.selection.select(this.data.serialNumbers[_i]);
        this.data.serialNumbers[_i].activated = false;
      }
      this.maxQuantityTemp = this.quantityFC.value;
    });
    // para cuando se modifica en tiempo real el campo Descuento (en soles)
    this.discountFC.valueChanges.subscribe(result => {
      this.total = ((parseFloat(this.data.sale) - result) * this.initQuantity);
      this.discountPercentage = parseFloat(((100 * result) / parseInt(this.data.sale)).toFixed(2));
      this.discountNumber = this.discountFC.value;
    });
    // para cuando se modifica en tiempo real el campo Descuento (en porcentaje)
    this.discountPercentageFC.valueChanges.subscribe(result => {
      this.discountNumber = (parseInt(this.data.sale) * result) / 100;
      this.total = ((parseFloat(this.data.sale) - this.discountNumber) * this.initQuantity);
      this.total = parseFloat(this.total.toFixed(2));
    });
    // Retorna la lista de productos filtrados en el autocomplete
    this.filteredSeries = this.serieList.valueChanges
      .pipe(
        startWith(''),
        map(serie => serie ? this._filterSeries(serie.toString()) : this.data.serialNumbers.slice())
      );
    let snSubs = this.serieList.valueChanges.subscribe(result => {
      this.isEmpty = !!result;
    });
    this.suscribe.push(snSubs);
  }

  ngOnDestroy() {
    this.suscribe.forEach(res => res.unsubscribe);
  }

  private _filterSeries(value: string): serialNumber[] {
    const filterValue = value;
    this.firstFilteredSerie = (this.data.serialNumbers.filter(serie => serie.number.toString().indexOf(filterValue) === 0))[0];
    this.isEmpty = !this.data.serialNumbers.filter(serie => serie.number.toString().indexOf(filterValue) === 0).length;
    return this.data.serialNumbers.filter(serie => serie.number.toString().indexOf(filterValue) === 0);
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
        discount: { amount: this.discountNumber * this.initQuantity, percentage: this.discountPercentage },
        quantity: this.initQuantity,
        warehouse: this.data.warehouse,
        discountType: "discount",
        salePrice: (parseFloat(this.data.sale) - this.discountNumber) * this.initQuantity,
        sale: parseFloat(this.data.sale),
        serial: this.data.serialNumbers,
        movement: this.dialogRef,
        maxDiscount : this.data.maxDiscount
      },
      panelClass: 'ms-custom-dialogbox'
    });
  }
  /**
   * @desc  Disminuye la cantidad de productos
   * @return { void } : Without returns
   */
  DecreaseQuantity(): void {
    if (this.initQuantity > 0) {
      this.initQuantity = this.initQuantity - 1
      this.total = this.initQuantity * (parseFloat(this.data.sale) - this.discountNumber);
      this.initPrice = this.initQuantity * parseFloat(this.data.sale);
      this.quantityFC.setValue(this.initQuantity)
    }
  }
  /**
   * @desc  Aumenta a cantidad de productos
   * @return { void } : Without returns
   */
  IncreaseQuantity(): void {
    if (this.initQuantity < parseFloat(this.data.stock)) {
      this.initQuantity = this.initQuantity + 1
      this.total = this.initQuantity * (parseFloat(this.data.sale) - this.discountNumber);
      this.initPrice = this.initQuantity * parseFloat(this.data.sale);
      this.quantityFC.setValue(this.initQuantity);
    }
  }
  /**
   * @desc  Disminuye el descuento (en soles )
   * @return { void } : Without returns
   */
  DecreaseDiscountNumber(): void {
    if (this.discountNumber > 0) {
      if (this.discountNumber % 1 != 0) {
        this.discountNumber = this.discountNumber + 1 - (this.discountNumber % 1);
      }
      this.discountNumber = this.discountNumber - 1; parseInt
      this.discountPercentage = (100 * this.discountNumber) / parseFloat(this.data.sale);
      this.total = ((parseFloat(this.data.sale) - this.discountNumber) * this.initQuantity);
      this.total = parseFloat(this.total.toFixed(2));
    }
  }
  /**
   * @desc Aumenta el descuento ( en soles )
   * @return { void } : Without returns
   */
  IncreaseDiscountNumber(): void {
    if (this.discountNumber < this.maxDiscount  )  {
      if (this.discountNumber % 1 != 0) {
        this.discountNumber = this.discountNumber - (this.discountNumber % 1);
      }
      this.discountNumber = this.discountNumber + 1
      this.discountPercentage = parseFloat(((100 * this.discountNumber) / parseFloat(this.data.sale)).toFixed(2));
      this.total = ((parseFloat(this.data.sale) - this.discountNumber) * this.initQuantity);
      this.total = parseFloat(this.total.toFixed(2));
    }
  }
  /**
   * @desc  Dismuye el descuento en porcentaje
   * @return { void } : Without returns
   */
  DecreaseDiscountPercentage(): void {
    if (this.discountPercentage > 0) {
      if (this.discountPercentage % 1 != 0) {
        this.discountPercentage = this.discountPercentage + 1 - (this.discountPercentage % 1);
      }
      this.discountPercentage = this.discountPercentage - 1
      this.discountNumber = parseFloat(((parseFloat(this.data.sale) * this.discountPercentage) / 100).toFixed(2));
      this.total = ((parseFloat(this.data.sale) - this.discountNumber) * this.initQuantity);
      this.total = parseFloat(this.total.toFixed(2));
    }
  }
  /**
   * @desc  Aumenta el descuento en Porcentaje
   * @return { void } : Without returns
   */
  IncreaseDiscountPercentage(): void {
    if (  this.discountPercentage < this.data.maxDiscount) {
      if (this.discountPercentage % 1 != 0) {
        this.discountPercentage = this.discountPercentage - (this.discountPercentage % 1);
      }
      this.discountPercentage = this.discountPercentage + 1
      this.discountNumber = parseFloat(((parseFloat(this.data.sale) * this.discountPercentage) / 100).toFixed(2));
      this.total = ((parseFloat(this.data.sale) - this.discountNumber) * this.initQuantity);
      this.total = parseFloat(this.total.toFixed(2));
    }
  }
  /**
    * @desc  Entra cuando se da el evento de cambio de state del checkbox, calcula el numero maximo de nro de series
    * @param {serie} i  : Indice de la serie actual
    * @return { void } : Without returns
    */
  changeValue(i): void {
    if (this.selection.isSelected(i) == false) {
      this.maxQuantityTemp++;
    }
    else {
      this.maxQuantityTemp--;
    }
    this.selection.toggle(i);
    if (this.maxQuantityTemp >= this.quantity) {
      this.data.serialNumbers.forEach((serie, indice) => {
        if (this.selection.isSelected(serie) == false) {
          serie.activated = true;
        }
      });
    }
    else {
      this.data.serialNumbers.forEach((serie, i) => {
        serie.activated = false;
      });
    }
  }
  /**
      * @desc  Entra cuando se da el evento de Click en el enter, selecciona el primer indice
      * @return { void } : Without returns
      */
  onEnterClick(): void {
    if (this.firstFilteredSerie) {
      if (this.selection.isSelected(this.firstFilteredSerie) == false) {
        this.selection.select(this.firstFilteredSerie);
        this.maxQuantityTemp++;
      }
      this.serieList.setValue('');
      if (this.maxQuantityTemp >= this.quantity) {
        this.data.serialNumbers.forEach((serie, indice) => {
          if (this.selection.isSelected(serie) == false) {
            serie.activated = true;
          }
        });
      }
    }
  }

}

