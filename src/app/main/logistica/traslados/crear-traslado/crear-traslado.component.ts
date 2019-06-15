import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/core/database.service';
import { MatDialogRef, MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs';
import { Product, Package, serialNumber, ProductCart } from 'src/app/core/ms-types';
import { startWith, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-crear-traslado',
  templateUrl: './crear-traslado.component.html'
})
export class CrearTrasladoComponent implements OnInit {
  filteredDocuments: Observable<any>;
  filteredProducts: Observable<any>;
  filteredWarehouse: Observable<any>;
  filteredSeries: Observable<serialNumber[]>;
  prod: ProductCart;
  productListFC = new FormControl(null);
  DocumentListFC = new FormControl(null);
  WarehouseOriFC = new FormControl(null);
  WarehouseDestFC = new FormControl(null);
  quantityFC = new FormControl(null);
  serieList = new FormControl(null);
  mergedProductsAndPackages: Array<Product | Package> = [];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CrearTrasladoComponent>,
    public dbs: DatabaseService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.dbs.getDocumentsByType("TRANSFERENCIA");
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filteredDocuments =
      this.DocumentListFC
        .valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterDocuments(value))
        );
    this.filteredProducts =
      this.productListFC
        .valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterProducts(value))
        );
    this.filteredWarehouse =
      this.WarehouseOriFC
        .valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterWarehouses(value))
        );
    if (this.prod) {
      //Retorna la lista de productos filtrados en el autocomplete
      this.filteredSeries = this.serieList.valueChanges
        .pipe(
          startWith(''),
          map(serie => serie ? this._filterSeries(serie.toString()) : this.prod.serialNumbers.slice())
        );
    }

  }

  private _filterSeries(value: string): serialNumber[] {
    const filterValue = value;
    return this.prod.serialNumbers.filter(serie => serie.number.toString().indexOf(filterValue) === 0);
  }
  private _filterWarehouses(value): any {
    const filterValue = value.toLowerCase();
    return this.dbs.warehouses.filter(option => option['name'].toLowerCase().includes(filterValue));
  }
  private _filterProducts(value): any {
    const filterValue = value.toLowerCase();
    return this.dbs.productsByWarehouse.filter(option => option['name'].toLowerCase().includes(filterValue));
  }
  private _filterDocuments(value): any {
    const filterValue = value.toLowerCase();
    return this.dbs.documentsByType.filter(option => option['name'].toLowerCase().includes(filterValue));
  }
  /*Cuando hace click fuera del dialog*/
  onNoClick(): void {
    console.log()
  }
  currentProduct(prod): void {
    console.log(prod.serialNumbers);
    this.prod = prod;
  }
  originWarehouse(alm): void {
    this.dbs.getProductsByWarehosue(alm.name);
    this.productListFC.setValue("");
  }
}
