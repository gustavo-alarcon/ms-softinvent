import { Product } from './../../../../core/ms-types';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Validators, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { of, Observable, Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/core/database.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-crear-promocion',
  templateUrl: './crear-promocion.component.html',
  styles: []
})
export class CrearPromocionComponent implements OnInit {

  types: Observable<any> = of([
    { name: 'descuento', value: 1 },
    { name: 'n (x) n', value: 2 }
  ]);

  promotionFormGroup: FormGroup;
  toggleNameCategoryFormControl = new FormControl(true);
  filterProductFormControl = new FormControl(null);
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

  filteredProductList: Observable<any>;
  filteredCategoryList: Observable<any>;

  subscription: Array<Subscription> = [];

  constructor(
    public dbs: DatabaseService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();

    this.filteredProductList =
      this.filterProductFormControl
        .valueChanges
        .pipe(
          startWith<any>(''),
          map(value => typeof value === 'string' ? value.toLowerCase() : value.name.toLowerCase()),
          map(name => name ? this.dbs.products.filter(option => option['name'].toLowerCase().includes(name)) : this.dbs.products)
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

  showSelectedProduct(product?: Product): void {
    console.log(product);
  }

}
