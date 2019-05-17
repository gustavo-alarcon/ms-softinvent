import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';
import { StateManagementService } from 'src/app/core/state-management.service';

@Component({
  selector: 'app-ms-ticket-step-two',
  templateUrl: './ms-ticket-step-two.component.html',
  styles: []
})
export class MsTicketStepTwoComponent implements OnInit {

  /**
   * VARIABLES GABY
   */
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

  /**
   * 
   * VARIABLES FALTANTES
   */
  selectedType = new FormControl();
  partyFromList = new FormControl();

  constructor(
     public dbs: DatabaseService,
     private state: StateManagementService
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
      option['sale'].toString().includes(ref));
    this.dataSource.data = this.filteredProducts;
  }

}
