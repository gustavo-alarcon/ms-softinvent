import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';
import { MsTicketDialogProductDescriptionComponent } from '../ms-ticket-dialog-product-description/ms-ticket-dialog-product-description.component';
import { MsTicketDialogProductMovementComponent } from '../ms-ticket-dialog-product-movement/ms-ticket-dialog-product-movement.component'

@Component({
  selector: 'app-ms-ticket-product-search',
  templateUrl: './ms-ticket-product-search.component.html',
  styles: []
})
export class MsTicketProductSearchComponent implements OnInit {
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
  constructor(
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
  
  /*realiza la busqueda de elementos con cada campo de la tabla */
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
   * @return { void } : Without returns
   */
  detalles(product): void {
    const dialogRef = this.dialog.open(MsTicketDialogProductDescriptionComponent, {
      data: { imagePath: this.imagePath, description: product.name }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  /* addProduct() abre el dialog de agregar un producto
   * @product{ string [] } : Lista de los campos del producto seleccionado en la tabla
   * void : no retorna nada 
   */
  addProduct(product): void {
    const dialogRef = this.dialog.open(MsTicketDialogProductMovementComponent, {
      data: { name: product.name, sale: product.sale, stock: product.stock, category: product.category, warehouse: product.warehouse, imagePath: this.imagePath },
      panelClass: 'ms-custom-dialogbox'

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
