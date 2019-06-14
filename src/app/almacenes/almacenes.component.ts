import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../core/database.service';
import { MatBottomSheet, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material';
import { CreateWarehouseComponent } from './crear-almacen/crear-almacen.component';
import { EditWarehouseComponent } from './editar-almacen/editar-almacen.component';
import { InfoWarehouseComponent } from './info-almacen/info-almacen.component';
import { ConfirmDeleteWarehouseComponent } from './confirmar-borrar-almacen/confirmar-borrar-almacen.component';

@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.component.html',
  styles: []
})
export class WarehousesComponent implements OnInit {

  disableTooltips = new FormControl(true);
  filteredWarehouses: Array<any> = [];

  displayedColumns: string[] = ['index', 'name', 'address', 'supervisor', 'Editar'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dbs: DatabaseService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private snackbar: MatSnackBar
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
    const dialogRef = this.dialog.open(CreateWarehouseComponent,{
      panelClass: 'ms-custom-dialogbox'
    });
  }

  editWarehouse(product): void {
    this.dialog.open(EditWarehouseComponent, {
      data: product,
      panelClass: 'ms-custom-dialogbox'
    });
  }

  deleteWarehouse(warehouse): void {
    const confirmDialogRef = this.dialog.open(ConfirmDeleteWarehouseComponent, {
      data: warehouse,
      panelClass: 'ms-custom-dialogbox'
    });

    confirmDialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this.snackbar.open('Listo! ... almacén borrado', 'Cerrar', {
          duration: 6000
        });
      } else {
        this.snackbar.open('Ufff! ... menos mal te preguntamos', 'Cerrar', {
          duration: 6000
        })
      }
    })
  }

  showInfo(warehouse){
    this.bottomSheet.open(InfoWarehouseComponent,{
      data: warehouse
    })
  }
}
