import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, mergeMap } from 'rxjs/operators';
import { Product, Package, PackageProduct } from 'src/app/core/ms-types';

@Component({
  selector: 'app-crear-paquete',
  templateUrl: './crear-paquete.component.html',
  styles: []
})
export class CrearPaqueteComponent implements OnInit {
  createPackageFormGroup: FormGroup;
  filteredProducts: Observable<any>;
  productListFC = new FormControl(null);
  quantityFC = new FormControl(null);
  mergedProductsAndPackages: Array<Product | Package> = [];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  productList: Array<PackageProduct> = [];
  displayedColumns: string[] = ['index', 'name', 'category', 'quantity', 'actions'];
  prod: Product;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CrearPaqueteComponent>,
    public dbs: DatabaseService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.createPackageFormGroup = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      sale: ['', Validators.required]
    });
    const mergeSubs = this.dbs.currentDataProducts
      .pipe(
        mergeMap(products => {
          let merge: Array<any> = [];
          return this.dbs.currentDataPackages
            .pipe(
              map(packages => {
                merge = [...products, ...packages];
                return merge;
              })
            );
        })
      )
      .subscribe(merge => {
        this.mergedProductsAndPackages = merge;
      });
    this.filteredProducts =
      this.productListFC
        .valueChanges
        .pipe(
          startWith<any>(''),
          map(value => typeof value === 'string' ? value.toLowerCase() : value.name.toLowerCase()),
          map(name => name ? this.mergedProductsAndPackages.filter(option =>
            (option['name'].toLowerCase().includes(name) ||
              option['code'].toLowerCase().includes(name))) : this.mergedProductsAndPackages),
          map(res => {
            const _list = [];

            res.forEach(element => {
              const coincidence =
                _list.filter(product =>
                  (product['code'] === element['code'] &&
                    product['name'] === element['name'])
                );
              if (!coincidence.length) {
                _list.push(element);
              }
            });

            return _list;
          })
        );

  }
  addItem(): void {
    if (this.prod) {
      this.productList.push(
        {
          id: '',
          sale: this.prod.sale,
          name: this.prod.name,
          category: this.prod.category,
          code: this.prod.code,
          quantity: this.quantityFC.value,
          unit: this.prod.unit,
        }
      );
      this.dataSource.data = this.productList;
      this.quantityFC.setValue('');
      this.productListFC.setValue('');
    }
  }

  deleteItem(index: number): void {
    this.productList.splice(index, 1);
    this.dataSource.data = this.productList;
  }
  currentProduct(prod): void {
    this.prod = prod;
  }
  onEnterClick(prod): void {
    this.prod = prod;

  }
  save(): void {
    this.dbs.packagesCollection
      .add(this.createPackageFormGroup.value)
      .then(ref => {
        ref.update({ id: ref.id, regDate: Date.now(), currency: "PEN" });
        this.productList.forEach(item => {
          this.dbs.packagesCollection
            .doc(ref.id)
            .collection('products')
            .add(item)
            .then(ref => {
              ref.update({ id: ref.id });
            })
            .catch(err => {
              console.log(err);
              this.snackbar.open('Ups!...parece que hubo un error', 'Cerrar', {
                duration: 6000
              });
            });
        });
        this.snackbar.open('Listo!', 'Cerrar', {
          duration: 6000
        });
        this.dialogRef.close(true);
      })
      .catch(err => {
        console.log(err);
        this.snackbar.open('Ups!...parece que hubo un error', 'Cerrar', {
          duration: 6000
        });
      });
  }

}
