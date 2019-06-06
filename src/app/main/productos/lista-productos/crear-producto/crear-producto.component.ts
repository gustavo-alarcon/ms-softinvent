import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/core/database.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map, merge } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styles: []
})
export class CreateProductComponent implements OnInit {

  createProductFormGroup: FormGroup;
  categoryFromList = new FormControl('');
  warehouseFromList = new FormControl('');
  unitFromList = new FormControl('');
  categoryField = '';
  warehouseField = '';
  unitField = '';
  filteredCategoryOptions: Observable<any>;
  filteredWarehouseOptions: Observable<any>;
  filteredUnitOptions: Observable<any>;
  nameAlreadyExist = false;
  codeAlreadyExist = false;
  productAlreadyExist = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    public dbs: DatabaseService,
    public auth: AuthService,
    public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateProductComponent>
  ) { }

  ngOnInit() {

    this.createProductFormGroup = this.fb.group({
      id: '',
      category: ['', Validators.required],
      warehouse: ['', Validators.required],
      code: ['', Validators.required],
      name: ['', Validators.required],
      unit: ['', Validators.required],
      initialStock: ['', Validators.required],
      warningStock: ['', Validators.required],
      alertStock: ['', Validators.required],
      stock: '',
      currency: ['', Validators.required],
      purchase: ['', Validators.required],
      sale: ['', Validators.required],
      maxDiscount: ['', Validators.required],
      regDate: Date.now(),
      userName: this.auth.userInvent.name + ', ' + this.auth.userInvent.lastname,
      userId: this.auth.userInvent.uid
    });

    this.filteredCategoryOptions = this.categoryFromList.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCategories(value))
      );

    this.filteredWarehouseOptions = this.warehouseFromList.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterWarehouses(value))
      );

    this.filteredUnitOptions = this.unitFromList.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterUnits(value))
      );
  }

  private _filterCategories(value): any {
    const filterValue = value.toLowerCase();
    return this.dbs.categoryTypes['categoryTypes'].filter(option => option.toLowerCase().includes(filterValue) && option !== '');
  }

  private _filterWarehouses(value): any {
    const filterValue = value.toLowerCase();
    return this.dbs.warehouses.filter(option => option['name'].toLowerCase().includes(filterValue));
  }

  private _filterUnits(value): any {
    const filterValue = value.toLowerCase();
    return this.dbs.unitTypes['unitTypes'].filter(option => option.toLowerCase().includes(filterValue) && option !== '');
  }

  setCategoryField(category): void {
    this.createProductFormGroup.patchValue({
      category: category
    })
  }

  setUnitField(unit): void {
    this.createProductFormGroup.patchValue({
      unit: unit
    });
  }

  setWarehouseField(warehouse, name, code): void {
    this.createProductFormGroup.patchValue({
      warehouse: warehouse
    });

    this.checkIfProductExist(warehouse, name, code);
  }

  onSubmit(): void {

    this.loading = true;

    this.createProductFormGroup.patchValue({
      stock: this.createProductFormGroup.get('initialStock').value
    })

    this.dbs.productsCollection.add({
      id: '',
      category: this.createProductFormGroup.value.category.trim(),
      warehouse: this.createProductFormGroup.value.warehouse.trim(),
      code: this.createProductFormGroup.value.code.trim(),
      name: this.createProductFormGroup.value.name.trim(),
      unit: this.createProductFormGroup.value.unit.trim(),
      initialStock: this.createProductFormGroup.value.initialStock,
      warningStock: this.createProductFormGroup.value.warningStock,
      alertStock: this.createProductFormGroup.value.alertStock,
      stock: this.createProductFormGroup.value.stock,
      currency: this.createProductFormGroup.value.currency,
      purchase: this.createProductFormGroup.value.purchase,
      sale: this.createProductFormGroup.value.sale,
      maxDiscount: this.createProductFormGroup.value.maxDiscount,
      regDate: this.createProductFormGroup.value.regDate,
      userName: this.createProductFormGroup.value.userName,
      userId: this.createProductFormGroup.value.userId
    })
      .then(ref => {
        ref.update({ id: ref.id });

        this.loading = false;
        this.dialogRef.close();
      })


    this.dbs.checkIfCategoryExist(this.createProductFormGroup.value.category).subscribe(exist => {
      if (!exist) {

        this.dbs.categoryTypes['categoryTypes'].push(this.createProductFormGroup.value.category);

        this.dbs.categoryTypesDocument.get().forEach(categoryArray => {
          categoryArray.ref.set({
            categoryTypes: this.dbs.categoryTypes['categoryTypes']
          });
        })
          .catch(err => {
            console.log(err);
          });
      }
    });

    this.dbs.checkIfUnitExist(this.createProductFormGroup.value.unit).subscribe(exist => {
      if (!exist) {

        this.dbs.unitTypes['unitTypes'].push(this.createProductFormGroup.value.unit);

        this.dbs.unitTypesDocument.get().forEach(unitArray => {
          unitArray.ref.set({
            unitTypes: this.dbs.unitTypes['unitTypes']
          });
        })
          .catch(err => {
            console.log(err);
          });
      }
    })
  }

  checkIfNameExist(name): void {
    this.nameAlreadyExist = false;

    const filteredProductNames = this.dbs.products.filter(option => option['name'].toString() === name);

    if (filteredProductNames.length > 0) {
      this.nameAlreadyExist = true;
    }
  }

  checkIfCodeExist(code): void {
    this.codeAlreadyExist = false;

    const filteredProductCodes = this.dbs.products.filter(option => option['code'].toString() === code);

    if (filteredProductCodes.length > 0) {
      this.codeAlreadyExist = true;
    }
  }

  checkIfProductExist(warehouse, name, code): void {
    this.productAlreadyExist = false;

    const filteredProducts = this.dbs.products.filter(option =>
      option['name'].toString() === name &&
      option['code'].toString() === code &&
      option['warehouse'].toString() === warehouse);

    if (filteredProducts.length > 0) {
      this.productAlreadyExist = true;
      this.snackbar.open(`Este producto ya existe en ${warehouse}`, 'Cerrar', {
        duration: 4000
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}