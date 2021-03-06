import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EditDocComponent } from 'src/app/documentos/editar-documento/editar-documento.component';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styles: []
})
export class EditProductComponent implements OnInit {

  editProductFormGroup: FormGroup;
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dbs: DatabaseService,
    public auth: AuthService,
    private fb: FormBuilder,
    public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<EditDocComponent>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.categoryFromList.setValue(this.data.category);
    this.warehouseFromList.setValue(this.data.warehouse);
    this.unitFromList.setValue(this.data.unit);

    this.editProductFormGroup = this.fb.group({
      category: this.data.category,
      warehouse: this.data.warehouse,
      code: this.data.code,
      name: this.data.name,
      unit: this.data.unit,
      initialStock: this.data.initialStock,
      warningStock: this.data.warningStock,
      alertStock: this.data.alertStock,
      stock: '',
      currency: this.data.currency,
      purchase: this.data.purchase,
      sale: this.data.sale,
      maxDiscount: this.data.maxDiscount,
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
    return this.dbs.categoryTypes['categoryTypes'].filter(option => option.toLowerCase().includes(filterValue) && option != '');
  }

  private _filterWarehouses(value): any {
    const filterValue = value.toLowerCase();
    return this.dbs.warehouses.filter(option => option['name'].toLowerCase().includes(filterValue));
  }

  private _filterUnits(value): any {
    const filterValue = value.toLowerCase();
    return this.dbs.unitTypes['unitTypes'].filter(option => option.toLowerCase().includes(filterValue) && option != '');
  }

  setCategoryField(category): void {
    this.editProductFormGroup.patchValue({
      category: category
    });
  }

  setWarehouseField(warehouse, name, code): void {
    this.editProductFormGroup.patchValue({
      warehouse: warehouse
    });

    this.checkIfProductExist(warehouse, name, code);
  }

  setUnitField(unit): void {
    this.editProductFormGroup.patchValue({
      unit: unit
    });
  }

  onSubmit(): void {

    this.loading = true;

    this.editProductFormGroup.patchValue({
      stock: this.editProductFormGroup.get('initialStock').value
    });

    this.dbs.productsCollection.doc(this.data.id).update({
      category: this.editProductFormGroup.value.category.trim(),
      warehouse: this.editProductFormGroup.value.warehouse.trim(),
      code: this.editProductFormGroup.value.code.trim(),
      name: this.editProductFormGroup.value.name.trim(),
      unit: this.editProductFormGroup.value.unit.trim(),
      initialStock: this.editProductFormGroup.value.initialStock,
      warningStock: this.editProductFormGroup.value.warningStock,
      alertStock: this.editProductFormGroup.value.alertStock,
      stock: this.editProductFormGroup.value.stock,
      currency: this.editProductFormGroup.value.currency,
      purchase: this.editProductFormGroup.value.purchase,
      sale: this.editProductFormGroup.value.sale,
      maxDiscount: this.editProductFormGroup.value.maxDiscount,
      regDate: this.editProductFormGroup.value.regDate,
      userName: this.editProductFormGroup.value.userName,
      userId: this.editProductFormGroup.value.userId
    })
      .then(ref => {
        this.loading = false;
        this.dialogRef.close();
      });

    this.dbs.checkIfCategoryExist(this.editProductFormGroup.value.category)
    .subscribe(exist => {
      if (!exist) {
        const data = {
          id: '',
          name: this.editProductFormGroup.value.category,
          regDate: Date.now()
        }

        this.dbs.categoryTypesCollection
          .add(data)
            .then(ref => {
              ref.update({id: ref.id});
            })
            .catch(err => {
              console.log(err);
            });

      }
    });
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
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}