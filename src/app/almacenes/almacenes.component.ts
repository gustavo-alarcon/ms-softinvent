import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../core/database.service';
import { MatBottomSheet, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material';
import { CrearAlmacenComponent } from './crear-almacen/crear-almacen.component';
import { EditarAlmacenComponent } from './editar-almacen/editar-almacen.component';
import { InfoAlmacenComponent } from './info-almacen/info-almacen.component';

@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.component.html',
  styles: []
})
export class AlmacenesComponent implements OnInit {

  disableTooltips = new FormControl(true);
  filteredWarehouses: Array<any> = [];

  displayedColumns: string[] = ['index', 'name', 'address', 'supervisor', 'Editar'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dbs: DatabaseService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {

    this.dbs.currentDataWarehouses.subscribe( warehouses => {
      this.filteredWarehouses = warehouses;
      this.dataSource.data = this.filteredWarehouses;
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  filterData(ref: string) {
    ref = ref.toLowerCase();
    this.filteredWarehouses = this.dbs.warehouses.filter(option => 
      option['name'].toLowerCase().includes(ref) ||
      option['supervisor']['name'].toString().includes(ref) ||
      option['supervisor']['lastname'].toString().includes(ref) ||
      option['supervisor']['email'].toString().includes(ref) ||
      option['supervisor']['phone'].toString().includes(ref));
    this.dataSource.data = this.filteredWarehouses;
  }

  createWarehouse(): void {
    const dialogRef = this.dialog.open(CrearAlmacenComponent,{
      panelClass: 'ms-custom-dialogbox'
    });
  }

  editWarehouse(warehouse): void {
    this.dialog.open(EditarAlmacenComponent, {
      data: warehouse,
      panelClass: 'ms-custom-dialogbox'
    })
  }

  showInfo(warehouse){
    this.bottomSheet.open(InfoAlmacenComponent,{
      data: warehouse
    })
  }
}
