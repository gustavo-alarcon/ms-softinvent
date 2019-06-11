import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, mergeMap, finalize } from 'rxjs/operators';
import { Product, Package, PackageProduct } from 'src/app/core/ms-types';
import { AngularFireStorage } from '@angular/fire/storage';
import { inject } from '@angular/core/testing';
export interface DialogData {
  paquete: Package,
  products : Array<PackageProduct>,
}
@Component({
  selector: 'app-editar-paquete',
  templateUrl: './editar-paquete.component.html'
})
export class EditarPaqueteComponent implements OnInit {

  createPackageFormGroup: FormGroup;
  filteredProducts: Observable<any>;
  productListFC = new FormControl(null);
  quantityFC = new FormControl(null);
  nameFC = new FormControl(null);
  saleFC = new FormControl(null);
  codeFC = new FormControl(null);

  mergedProductsAndPackages: Array<Product | Package> = [];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  productList: Array<PackageProduct> = [];
  displayedColumns: string[] = ['index', 'name', 'category', 'quantity', 'actions'];
  prod: Product;
  quantityItems: number = this.pack.products.length;
  selectedFile: File;
  imageSrc: string | ArrayBuffer;

  constructor(
    @Inject(MAT_DIALOG_DATA) private pack : DialogData,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarPaqueteComponent>,
    public dbs: DatabaseService,
    private snackbar: MatSnackBar,

  ) { }
 

  ngOnInit() {
    console.log(this.pack);
    this.nameFC.setValue(this.pack.paquete.name);
    this.saleFC.setValue(this.pack.paquete.sale);
    this.codeFC.setValue(this.pack.paquete.code);
    this.productList = this.pack.products;
    this.dataSource.data = this.pack.products;
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
  onNoClick(): void {
    this.dialogRef.close();
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
      this.quantityItems = this.quantityItems + this.quantityFC.value;
      this.dataSource.data = this.productList;
      this.quantityFC.setValue('');
      this.productListFC.setValue('');
    }
  }
  deleteItem(index: number): void {
    this.quantityItems = this.quantityItems - this.productList[index].quantity;
    this.productList.splice(index, 1);
    this.dataSource.data = this.productList;
  }
  currentProduct(prod): void {
    this.prod = prod;
  }
  onEnterClick(prod): void {
    this.prod = prod;
  }
  openExplorer(event): void {
    this.selectedFile = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }

  }
}
