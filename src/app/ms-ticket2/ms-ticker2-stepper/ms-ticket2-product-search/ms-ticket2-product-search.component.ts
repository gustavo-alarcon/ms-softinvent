import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatBottomSheet, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';

@Component({
  selector: 'app-ms-ticket2-product-search',
  templateUrl: './ms-ticket2-product-search.component.html',
  styles: []
})
export class MsTicket2ProductSearchComponent implements OnInit {
  disableTooltips = new FormControl(true);
  filteredProducts: Array<any> = [];
  displayedColumns: string[] = ['name', 'stock', 'sale', 'warehouse'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  imagePath: string;
  description: string;
  name: string;
  sale: string;
  constructor(
    public dbs: DatabaseService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
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
  
}
