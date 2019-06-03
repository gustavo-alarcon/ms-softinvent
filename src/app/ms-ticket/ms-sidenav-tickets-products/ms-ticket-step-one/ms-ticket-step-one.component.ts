import { Component, OnInit, ViewChild } from '@angular/core';
import { StateManagementService } from 'src/app/core/state-management.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';
import { MsTicketDialogProductDescriptionComponent } from './ms-ticket-dialog-product-description/ms-ticket-dialog-product-description.component';
import { MsTicketDialogProductMovementComponent } from './ms-ticket-dialog-product-movement/ms-ticket-dialog-product-movement.component';
import { FormControl } from '@angular/forms';
import { SidenavService } from 'src/app/core/sidenav.service';
import { ProductCart, Promo, Discount, Ticket } from 'src/app/core/ms-types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ms-ticket-step-one',
  templateUrl: './ms-ticket-step-one.component.html',
  styles: []
})
export class MsTicketStepOneComponent implements OnInit {

  /**
   * VARIABLES EDU
   */
  disableTooltips = new FormControl(true);
  filteredProducts: Array<any> = [];
  displayedColumns: string[] = ['name', 'stock', 'sale','discount', 'warehouse', 'Detalles', 'Agregar'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  imagePath: string = "https://material.angular.io/assets/img/examples/shiba1.jpg"; // Imagen de prueba, Si el campo esta vacio: muestra la otra imagen
  description: string;
  name: string;
  sale: string;
  category: string;
  warehouse: string;

  ticket: Ticket;
  productList: Array<ProductCart>;
  constructor(
    public sidenav: SidenavService,
    public state: StateManagementService,
    public dbs: DatabaseService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dbs.currentDataProducts.subscribe(products => {
      this.filteredProducts = products;
      this.dataSource.data = this.filteredProducts;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  /**
   * @desc Función para filtrado de productos basada en coincidencia parcial
   * @param ref { string }: Valor referencial para realizar la búsqueda en productos
   */
  filterData(ref: string) {
    ref = ref.toLowerCase();
    this.filteredProducts = this.dbs.products.filter(option =>
      option['category'].toLowerCase().includes(ref) ||
      option['warehouse'].toLowerCase().includes(ref) ||
      option['name'].toLowerCase().includes(ref) ||
      option['stock'].toString().includes(ref) ||
      option['sale'].toString().includes(ref) ||
      option['discount'].toString().includes(ref));

    this.dataSource.data = this.filteredProducts;
  }
  /**
   * @desc  Abre el dialog de detalles del producto
   * @param {!string[]} product  : Lista de los campos del producto seleccionado en la tabla
   * @return { void } : Without returns
   */
  detalles(product): void {
    const dialogRef = this.dialog.open(MsTicketDialogProductDescriptionComponent, {
      data: { imagePath: this.imagePath, description: product.name },
      panelClass: 'ms-custom-dialogbox'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  /**
  * @desc  agrega un nuevo producto 
  * @param {!string[]} product  : Lista de los campos del producto seleccionado en la tabla
  * @return { void } : Without returns
  */
  addProduct(product): void {
    this.dbs.getSerialNumbers(product.id)
      .pipe(
        map(res => {
          //ADDING ACTIVATES TO RESULT
          res.forEach((serial, index) => {
            serial.activated = false;
          })
          return res;
        })
      ).subscribe(res => {

        const dialogRef = this.dialog.open(MsTicketDialogProductMovementComponent, {
          data: {
            name: product.name,
            sale: product.sale,
            stock: product.stock,
            category: product.category,
            warehouse: product.warehouse,
            serialList: product.serialList,
            serialNumbers: res,
            maxDiscount: product.maxDiscount
          },
          panelClass: 'ms-custom-dialogbox'

        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      })


  }

}
