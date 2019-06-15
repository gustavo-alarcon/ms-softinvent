import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/core/database.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map, merge, finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styles: []
})
export class CreateProductComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  uploadPercent: Observable<number>;

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
  selectedFile: File;
  imageSrc: string | ArrayBuffer;

  constructor(
    private fb: FormBuilder,
    public dbs: DatabaseService,
    public auth: AuthService,
    public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateProductComponent>,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      id: '',
      category : ['', Validators.required],
      warehouse : ['', Validators.required],
      code: ['', Validators.required],
      name: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
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
    return this.dbs.categoryTypes.filter(option => option['name'].toLowerCase().includes(filterValue) && option !== '');
  }

  private _filterWarehouses(value): any {
    const filterValue = value.toLowerCase();
    return this.dbs.warehouses.filter(option => option['name'].toLowerCase().includes(filterValue));
  }

  private _filterUnits(value): any {
    const filterValue = value.toLowerCase();
    return this.dbs.unitTypes['unitTypes'].filter(option => option.toLowerCase().includes(filterValue) && option !== '');
  }

 


  crearProducto(): void {
    this.loading = true;

    if (this.selectedFile) {
      const filePath = `/productsPictures/` + Date.now() + `${this.selectedFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedFile);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(res => {
            if (res) {
              this.dbs.productsCollection.add({
                id: '',
                category: this.categoryFromList.value,
                warehouse: this.warehouseFromList.value,
                code: this.firstFormGroup.value.code,
                name: this.firstFormGroup.value.name,
                unit: this.unitFromList.value,
                initialStock: this.secondFormGroup.value.initialStock,
                warningStock: this.secondFormGroup.value.warningStock,
                alertStock: this.secondFormGroup.value.alertStock,
                stock: this.secondFormGroup.value.stock,
                currency: this.secondFormGroup.value.currency,
                purchase: this.secondFormGroup.value.purchase,
                sale: this.secondFormGroup.value.sale,
                maxDiscount: this.secondFormGroup.value.maxDiscount,
                regDate: this.secondFormGroup.value.regDate,
                userName: this.secondFormGroup.value.userName,
                userId: this.secondFormGroup.value.userId,
                img : res
              })
                .then(ref => {
                  ref.update({ id: ref.id });
          
                  this.loading = false;
                  this.dialogRef.close();
                })
            }
          })
        })
      ).subscribe()
    }
    else{
      this.dbs.productsCollection.add({
        id: '',
        category: this.categoryFromList.value,
        warehouse: this.warehouseFromList.value,
        code: this.firstFormGroup.value.code,
        name: this.firstFormGroup.value.name,
        unit: this.unitFromList.value,
        initialStock: this.secondFormGroup.value.initialStock,
        warningStock: this.secondFormGroup.value.warningStock,
        alertStock: this.secondFormGroup.value.alertStock,
        stock: this.secondFormGroup.value.stock,
        currency: this.secondFormGroup.value.currency,
        purchase: this.secondFormGroup.value.purchase,
        sale: this.secondFormGroup.value.sale,
        maxDiscount: this.secondFormGroup.value.maxDiscount,
        regDate: this.secondFormGroup.value.regDate,
        userName: this.secondFormGroup.value.userName,
        userId: this.secondFormGroup.value.userId,
        img : ''
      })
    }
    this.dbs.checkIfCategoryExist(this.categoryFromList.value).subscribe(exist => {
      if (!exist) {

        const data = {
          id: '',
          name: this.categoryFromList.value,
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

    this.dbs.checkIfUnitExist(this.unitFromList.value).subscribe(exist => {
      if (!exist) {

        this.dbs.unitTypes['unitTypes'].push(this.unitFromList.value);

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
  
  openExplorer(event): void {
    this.selectedFile = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }

  }
  
  setCategoryField(category): void {
    this.firstFormGroup.patchValue({
      category: category
    })
  }

  setUnitField(unit): void {
    this.secondFormGroup.patchValue({
      unit: unit
    });
  }

  setWarehouseField(warehouse, name, code): void {
    this.firstFormGroup.patchValue({
      warehouse: warehouse
    });

    this.checkIfProductExist(warehouse, name, code);
  }

}



