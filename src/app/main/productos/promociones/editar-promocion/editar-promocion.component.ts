import { CrearPromocionComponent } from './../crear-promocion/crear-promocion.component';
import { DatabaseService } from 'src/app/core/database.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Product, Package, PromoProduct } from 'src/app/core/ms-types';
import { startWith, map, debounceTime, mergeMap } from 'rxjs/operators';
import { ConfirmarEditarPromocionComponent } from '../confirmar-editar-promocion/confirmar-editar-promocion.component';

@Component({
  selector: 'app-editar-promocion',
  templateUrl: './editar-promocion.component.html',
  styles: []
})
export class EditarPromocionComponent implements OnInit, OnDestroy {

  loading = false;
  loadingItems = false;

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
  referenceProducts: Array<PromoProduct> = [];

  filteredItemList: Observable<any>;
  filteredCategoryList: Observable<any>;

  subscriptions: Array<Subscription> = [];

  constructor(
    public dbs: DatabaseService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<EditarPromocionComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.createForm();

    this.loadingItems = true;
    const promoProductsSubs =
      this.dbs.getPromoProducts(this.data['promo']['id'])
        .pipe(
          map(products => {
            products.forEach((element, index) => {
              element['index'] = index;
            });
            return products;
          })
        )
        .subscribe(products => {
          this.promotionList = products;
          this.referenceProducts = products;
          this.dataSource.data = this.promotionList;
          this.loadingItems = false;
        });

    this.subscriptions.push(promoProductsSubs);



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

    this.subscriptions.push(discountSubs);

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

    this.subscriptions.push(mergeSubs);

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
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  createForm(): void {
    this.promotionFormGroup = this.fb.group({
      name: [this.data['promo']['name'], [Validators.required]],
      type: [this.data['promo']['type'], [Validators.required]],
      discount: [this.data['promo']['discount'] ? this.data['promo']['discount'] : null],
      firstNumber: [this.data['promo']['firstNumber'] ? this.data['promo']['firstNumber'] : null],
      secondNumber: [this.data['promo']['secondNumber'] ? this.data['promo']['secondNumber'] : null],
      active: [this.data['promo']['active'], [Validators.required]]
    });
  }

  showSelectedItem(item?: Product | Package): string | null {
    return item ? item.name : null;
  }

  showSelectedCategory(category?: any): string | null {
    return category ? category['name'] : null;
  }

  addItem(item: Product | Package): void {
    this.promotionList.push(
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
  }

  save(): void {
    this.dialog.open(ConfirmarEditarPromocionComponent, {
      data: {
        promo: this.promotionFormGroup.value,
        promoProducts: this.promotionList,
        referenceProducts: this.referenceProducts
      },
      panelClass: ['ms-custom-dialogbox']
    }).afterClosed().subscribe(res => {
      if (res) {
        this.dialogRef.close(true);
      }
    })
  }

}
