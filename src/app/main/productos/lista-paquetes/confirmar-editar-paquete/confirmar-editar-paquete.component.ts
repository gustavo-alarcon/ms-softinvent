import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';
import { Package, PackageProduct } from 'src/app/core/ms-types';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

export interface DialogData {
  productList: Array<PackageProduct>,
  currentPack: Package,
  newPack: Package,
  imgFile: File,
}
@Component({
  selector: 'app-confirmar-editar-paquete',
  templateUrl: './confirmar-editar-paquete.component.html',
})
export class ConfirmarEditarPaqueteComponent implements OnInit {
  currentProducts: Array<PackageProduct>;
  loading = false;
  uploadPercent: Observable<number>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ConfirmarEditarPaqueteComponent>,
    public dbs: DatabaseService,
    private snackbar: MatSnackBar,
    private storage: AngularFireStorage,

  ) { }

  ngOnInit() {
    console.log(this.data)
    this.getPackageProducts(this.data.currentPack);
  }
  uploadFile(newPicture: File): void {
    if (newPicture) {
      const filePath = `/packagePictures/` + Date.now() + `${newPicture.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, newPicture);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(res => {
            if (res) {
              this.dbs.packagesCollection.doc(this.data.currentPack.id).update({
                name: this.data.newPack.name,
                sale: this.data.newPack.sale,
                code: this.data.newPack.code,
                img : res
              })
              this.editItemsList(this.currentProducts, this.data.productList);
              this.dialogRef.close(true);

            }
          })
        })
      ).subscribe()
    }
  }
  edit(): void {
    this.loading = true;
    if (!this.data.imgFile) {
      this.dbs.packagesCollection.doc(this.data.currentPack.id).update({
        name: this.data.newPack.name,
        sale: this.data.newPack.sale,
        code: this.data.newPack.code
      })
      this.editItemsList(this.currentProducts, this.data.productList);
      this.dialogRef.close(true);
    }
    else { this.uploadFile(this.data.imgFile); }
    this.loading = false;
  }

  editItemsList(currentPackage: Array<PackageProduct>, newPackage: Array<PackageProduct>): void {
    //busca elementos conicidentes y los borra de la nueva lista
    // los que no se eliminan de la lista actual
    let flat = false;
    for (var _i = 0; _i < currentPackage.length; _i++) {
      for (var _j = 0; _j < newPackage.length; _j++) {
        if (currentPackage[_i] == newPackage[_j]) {
          newPackage.splice(_j, 1);
          flat = true;
          break;
        }
      }
      if (flat == false) {
        this.dbs.packagesCollection
          .doc(this.data.currentPack.id)
          .collection('products')
          .doc(currentPackage[_i].id)
          .delete();
      }
    }
    //agrega el resto de elementos de la nueva lista
    for (var _j = 0; _j < newPackage.length; _j++) {
      this.dbs.packagesCollection
        .doc(this.data.currentPack.id)
        .collection('products')
        .add(newPackage[_j])
        .then(ref => {
          ref.set({ id: ref.id }, { merge: true });
        })
        .catch(err => {
          console.log(err);
          this.snackbar.open('Ups!...parece que hubo un error', 'Cerrar', {
            duration: 6000
          });
        });
    }

  }
  getPackageProducts(packages: Package): void {
    const packageProductsSubs =
      this.dbs.getPackagesProducts(packages.id)
        .pipe(
          map(products => {
            products.forEach((element, index) => {
              element['index'] = index;
            });
            this.currentProducts = products;
            return products;
          })
        ).subscribe();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
