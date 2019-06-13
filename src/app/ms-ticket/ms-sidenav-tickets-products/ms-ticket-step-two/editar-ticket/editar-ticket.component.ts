import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ProductCart, Promo, Discount, serialNumber } from 'src/app/core/ms-types';
import { StateManagementService } from 'src/app/core/state-management.service'
import { ConfirmEditComponent } from 'src/app/ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-two/confirmacion-edit/confirmacion-edit.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

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
  serialNumbers: Array<serialNumber>,
  maxDiscount : number,
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
  maxQuantityTemp: number = this.data.quantity; // cantida maxima temporal conforme se marcan los numeros de serie
  listaPromos: string[] = ['Dia de la madre', "cierra puerta"];
  filteredSeries: Observable<serialNumber[]>;
  firstFilteredSerie: serialNumber = this.data.serialNumbers[0];
  selection = new SelectionModel<serialNumber>(true, []);
  quantity: number = this.data.quantity;
  newProduct: ProductCart;
  promo: Promo;
  discount: Discount;
  enableAddProd: boolean = false;
  isEmpty: boolean = false;
  suscribe: Array<Subscription> = [];
  maxDiscount : number = this.data.maxDiscount * parseInt(this.data.sale) / 100;
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EditTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public carrito: StateManagementService
  ) { }

  ngOnInit() {
    console.log("descuento ", this.data.maxDiscount)
    for (var _i = 0; _i < this.data.serialNumbers.length; _i++) {
      if (this.data.serialNumbers[_i].activated == false) {
        this.selection.select(this.data.serialNumbers[_i]);
      }
    }
    // para modificar en tiempo real el precio total ( cantidad * precio - (descuento | promocion))
    this.quantityFC.valueChanges.subscribe(result => {
      this.selection.clear();
      this.quantity = this.quantityFC.value;
      this.initQuantity = this.quantityFC.value;
      if (this.quantityFC.value != '') {
        this.total = result * (parseFloat(this.data.sale) - this.discountNumber);
        this.initPrice = result * parseFloat(this.data.sale);
        this.enableAddProd = !(result > this.data.stock);
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
  /**
    * @desc Filtra los numeros de serie segun se escriba 
    * @return { serialNumber[] } : retorna una lista de numeros de serie 
    */
  private _filterSeries(value: string): serialNumber[] {
    const filterValue = value;
    this.firstFilteredSerie = (this.data.serialNumbers.filter(serie => serie.number.toString().indexOf(filterValue) === 0))[0];
    this.isEmpty = !this.data.serialNumbers.filter(serie => serie.number.toString().indexOf(filterValue) === 0).length;
    return this.data.serialNumbers.filter(serie => serie.number.toString().indexOf(filterValue) === 0);
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
        editar: this.dialogRef,
        serialNumbers: this.data.serialNumbers,
        maxDiscount : this.data.maxDiscount,
      },
      panelClass: 'ms-custom-dialogbox'

    }).afterClosed().subscribe(res => {
      if (res) { this.dialogRef.close() }
    })
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
      if (this.firstFilteredSerie.activated == false) {
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
    if (this.initQuantity <this.data.stock) {
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
}
