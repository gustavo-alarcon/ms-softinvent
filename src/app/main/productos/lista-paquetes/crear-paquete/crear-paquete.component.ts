import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, mergeMap, finalize } from 'rxjs/operators';
import { Product, Package, PackageProduct } from 'src/app/core/ms-types';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-crear-paquete',
  templateUrl: './crear-paquete.component.html',
  styles: []
})
export class CrearPaqueteComponent implements OnInit {
  loading = false;
  alreadyExist = false;
  uploadPercent: Observable<number>;
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
  quantityItems: number = 0;
  selectedFile: File;
  imageSrc: string | ArrayBuffer;
  alreadyExist = false;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CrearPaqueteComponent>,
    public dbs: DatabaseService,
    private snackbar: MatSnackBar,
    private storage: AngularFireStorage,
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
  /*Cuando hace click fuera del dialog*/
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
  save(): void {
    if ( this.productList.length!=0){
      this.loading = true;
      let now = Date.now();
      let path;
      if (this.selectedFile) {
        const filePath = `/packagePictures/` + now + `${this.selectedFile.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.selectedFile);
        this.uploadPercent = task.percentageChanges();
        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(res => {
              if (res) {
                console.log("ruta" + res);
                this.dbs.packagesCollection
                  .add(this.createPackageFormGroup.value)
                  .then(ref => {
                    ref.update({
                      id: ref.id,
                      regDate: Date.now(),
                      currency: "PEN",
                      items: this.quantityItems,
                      category: "Paquete",
                      img: res,
                      unit: "Unidad"
                    });
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
                    this.loading = false;
                    this.dialogRef.close(true);
                  })
                  .catch(err => {
                    console.log(err);
                    this.snackbar.open('Ups!...parece que hubo un error', 'Cerrar', {
                      duration: 6000
                    });
                  });
                console.log(path)
  
              }
            })
          })
        ).subscribe()
      }
      else {
        this.dbs.packagesCollection
          .add(this.createPackageFormGroup.value)
          .then(ref => {
            ref.update({
              id: ref.id,
              regDate: Date.now(),
              currency: "PEN",
              items: this.quantityItems,
              img: '',
              category: "Paquete",
              unit: "Unidad"
            });
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
            this.loading = false;
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
    else{
      this.snackbar.open('Ups!...Tienes que agregar items para continuar', 'Cerrar', {
        duration: 6000
      });
    }    
  }
  checkIfExist(packageCode,packageName): void {

    this.alreadyExist = false;

    var filteredCode = this.dbs.packages.filter(option => option['code'].toString() === packageCode);
    var filteredName = this.dbs.packages.filter(option => option['name'].toString() === packageName);

    if(filteredCode.length > 0 || filteredName.length > 0){
      this.alreadyExist = true;
      this.snackbar.open("Este paquete ya existe", "Cerrar", {
        duration: 1000
      })
    }
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
