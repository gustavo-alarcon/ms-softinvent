import { Package } from 'src/app/core/ms-types';
import { Product, PromoProduct } from './../../../../core/ms-types';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialogRef } from '@angular/material';
import { Validators, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { of, Observable, Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/core/database.service';
import { startWith, map, mergeMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-crear-promocion',
  templateUrl: './crear-promocion.component.html',
  styles: []
})
export class CrearPromocionComponent implements OnInit, OnDestroy {

  loading = false;

  types: Observable<any> = of([
    { name: 'Descuento', value: 1, disabled: false },
    { name: 'N (x) N', value: 2, disabled: true }
  ]);

  promotionFormGroup: FormGroup;
  toggleNameCategoryFormControl = new FormControl(true);
  filterItemFormControl = new FormControl(null);
  filterCategoryFormControl = new FormControl(null);

  productList: Array<any> = [
    { index: 0, code: '1010100', name: 'Antare', category: 'entretenimiento' },
    { index: 1, code: '1010200', name: 'Aleman', category: 'entretenimiento' },
    { index: 2, code: '1010300', name: 'Piscis', category: 'entretenimiento' }
  ];

  displayedColumns: string[] = ['index', 'code', 'name', 'category', 'actions'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  mergedProductsAndPackages: Array<Product | Package> = [];
  promotionList: Array<PromoProduct> = [];

  filteredItemList: Observable<any>;
  filteredCategoryList: Observable<any>;

  subscription: Array<Subscription> = [];

  constructor(
    public dbs: DatabaseService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<CrearPromocionComponent>
  ) { }

  ngOnInit() {
    this.createForm();

    const discountSubs = this.promotionFormGroup.get('discount').valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(res => {
        if (res > 100) {
          this.promotionFormGroup.get('discount').setValue(100);
        } else if (res < 0) {
          this.promotionFormGroup.get('discount').setValue(0);
        }
      });

    this.subscription.push(discountSubs);

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

    this.subscription.push(mergeSubs);

    this.filteredItemList =
      this.filterItemFormControl
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

    this.filteredCategoryList =
      this.filterCategoryFormControl
        .valueChanges
        .pipe(
          startWith<any>(''),
          map(value => typeof value === 'string' ? value.toLowerCase() : value.name.toLowerCase()),
          map(name => name ? this.dbs.categoryTypes.filter(option => option['name'].toLowerCase().includes(name)) : this.dbs.categoryTypes)
        );
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  createForm(): void {
    this.promotionFormGroup = this.fb.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      discount: [null],
      firstNumber: [null],
      secondNumber: [null],
      active: [true, [Validators.required]]
    });
  }

  showSelectedItem(item?: Product | Package): string | null {
    return item ? item.name : null;
  }

  showSelectedCategory(category?: any): string | null {
    return category ? category['name'] : null;
  }

  addItem(item: Product | Package): void {
    const itemIds = this.promotionList.map(ref => ref.itemId);
    const coincidence = itemIds.indexOf(item.id);

    if (coincidence < 0) {
      this.promotionList.unshift(
        {
          id: '',
          itemId: item.id,
          code: item.code,
          name: item.name,
          category: item.category,
          regDate: Date.now()
        }
      );
      this.dataSource.data = this.promotionList;
      this.filterItemFormControl.setValue(
        {
          id: '',
          itemId: '',
          code: '',
          name: '',
          category: '',
          regDate: 0
        }
      );
    } else {
      this.snackbar.open(`${item.name} ya fue seleccionado`, 'Cerrar', {
        duration: 6000
      });
      this.filterItemFormControl.setValue(
        {
          id: '',
          itemId: '',
          code: '',
          name: '',
          category: '',
          regDate: 0
        }
      );
    }

  }

  deleteItem(index: number): void {
    this.promotionList.splice(index, 1);
    this.dataSource.data = this.promotionList;
  }

  addCategory(category: any): void {
    const filteredCategory = this.mergedProductsAndPackages.filter(item => item.category === category.name);
    const filteredItems: Array<Product | Package> = [];

    filteredCategory.forEach(element => {
      const coincidenceList =
        filteredItems.filter(product =>
          (product['code'] === element['code'] &&
            product['name'] === element['name'])
        );
      if (!coincidenceList.length) {
        filteredItems.push(element);
      }
    });

    this.promotionList =
      filteredItems.map<PromoProduct>(item => {
        return {
          id: '',
          itemId: item.id,
          code: item.code,
          name: item.name,
          category: item.category,
          regDate: Date.now()
        };
      });
    this.dataSource.data = this.promotionList;
    this.filterCategoryFormControl.setValue(
      {
        id: '',
        name: '',
        regDate: 0
      }
    );
  }

  save(): void {
    this.loading = true;
    this.dbs.promotionsCollection
      .add(this.promotionFormGroup.value)
      .then(ref => {
        ref.update({ id: ref.id, regDate: Date.now() });
        this.promotionList.forEach(item => {
          this.dbs.promotionsCollection
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
        this.loading = false;
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
