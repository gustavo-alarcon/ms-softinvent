import { Component, OnInit, ViewChild } from '@angular/core';
import { StateManagementService } from 'src/app/core/state-management.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';
import { MsTicketDialogProductDescriptionComponent } from 'src/app/ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-one/ms-ticket-dialog-product-description/ms-ticket-dialog-product-description.component'
import { MsTicketDialogProductMovementComponent } from 'src/app/ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-one/ms-ticket-dialog-product-movement/ms-ticket-dialog-product-movement.component'
import { FormControl } from '@angular/forms';
import { SidenavService } from 'src/app/core/sidenav.service';
import { ProductCart, Promo, Discount, Ticket } from 'src/app/core/ms-types';

@Component({
  selector: 'app-ms-ventas-step-one',
  templateUrl: './ms-ventas-step-one.component.html',
  styles: []
})
export class MsVentasStepOneComponent implements OnInit {

  /**
   * VARIABLES EDU
   */
  disableTooltips = new FormControl(true);
  filteredProducts: Array<any> = [];
  displayedColumns: string[] = ['name', 'stock', 'sale', 'warehouse', 'Detalles', 'Agregar'];
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
    private sidenav: SidenavService,
    private state: StateManagementService,
    public dbs: DatabaseService,
    private dialog: MatDialog
  ) {
    this.productList = [];
    this.ticket = { cart: this.productList };
    this.state.agregarTicket(this.ticket);
  }

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
      option['sale'].toString().includes(ref));
    this.dataSource.data = this.filteredProducts;
  }
  /**
   * @desc  Abre el dialog de detalles del producto
   * @param {!string[]} product  : Lista de los campos del producto seleccionado en la tabla
   * @return { void } : Sin retornos
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
  * @return { void } : Sin retornos
  */
  addProduct(product): void {
    const dialogRef = this.dialog.open(MsTicketDialogProductMovementComponent, {
      data: {
        name: product.name,
        sale: product.sale,
        stock: product.stock,
        category: product.category,
        warehouse: product.warehouse,
      },
      panelClass: 'ms-custom-dialogbox'

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
