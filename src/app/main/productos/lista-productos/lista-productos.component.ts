import { DatabaseService } from 'src/app/core/database.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmDeleteProductComponent } from './confirmar-borrar-producto/confirmar-borrar-producto.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styles: []
})
export class ListaProductosComponent implements OnInit {

  disableTooltips = new FormControl(true);
  filteredProducts: Array<any> = [];

  displayedColumns: string[] = ['index', 'category', 'warehouse', 'code', 'name', 'unit', 'stock', 'currency', 'purchase', 'sale', 'actions'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dbs: DatabaseService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.dbs.currentDataProducts.subscribe(products => {
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
      option['sale'].toString().includes(ref) ||
      option['maxDiscount'].toString().includes(ref));
    this.dataSource.data = this.filteredProducts;
  }

  createProduct(): void {
    const dialogRef = this.dialog.open(CrearProductoComponent, {
      panelClass: 'ms-custom-dialogbox'
    });
  }

  editProduct(product): void {
    this.dialog.open(EditarProductoComponent, {
      data: product,
      panelClass: 'ms-custom-dialogbox'
    });
  }

  deleteProduct(product): void {
    const confirmDialogRef = this.dialog.open(ConfirmDeleteProductComponent, {
      data: product,
      panelClass: 'ms-custom-dialogbox'
    });

    confirmDialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this.snackbar.open('Listo! ... producto borrado', 'Cerrar', {
          duration: 6000
        });
      } else {
        this.snackbar.open('Ufff! ... menos mal te preguntamos', 'Cerrar', {
          duration: 6000
        })
      }
    })
  }

}
