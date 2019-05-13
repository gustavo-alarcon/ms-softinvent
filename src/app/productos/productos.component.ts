import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../core/database.service';
import { MatDialog, MatBottomSheet, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {

  disableTooltips = new FormControl(true);
  filteredProducts: Array<any> = [];

  displayedColumns: string[] = ['index', 'category', 'warehouse', 'code', 'name', 'unit', 'stock',  'currency', 'purchase', 'sale', 'Editar'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dbs: DatabaseService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {

    this.dbs.currentDataProducts.subscribe( products => {
      this.filteredProducts = products;
      this.dataSource.data = this.filteredProducts;
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterData(ref: string) {
    ref = ref.toLowerCase();
    this.filteredProducts = this.dbs.products.filter(option => 
      option['category'].toLowerCase().includes(ref) ||
      option['warehouse'].toLowerCase().includes(ref) ||
      option['code'].toLowerCase().includes(ref) ||
      option['name'].toLowerCase().includes(ref) ||
      option['unit'].toLowerCase().includes(ref) ||
      option['stock'].toString().includes(ref) ||
      option['purchase'].toString().includes(ref) ||
      option['sale'].toString().includes(ref));
    this.dataSource.data = this.filteredProducts;
  }

  createProduct(): void {
    const dialogRef = this.dialog.open(CrearProductoComponent,{
      panelClass: 'ms-custom-dialogbox'
    });
  }

  editProduct(product): void {
    this.dialog.open(EditarProductoComponent, {
      data: product,
      panelClass: 'ms-custom-dialogbox'
    })
  }

}
