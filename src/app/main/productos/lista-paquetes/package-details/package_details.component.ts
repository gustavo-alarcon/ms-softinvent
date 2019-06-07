import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';
import { Package } from 'src/app/core/ms-types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-package-details',
  templateUrl: './package_details.component.html',
  styles: []
})
export class PackageDetailsComponent implements OnInit {
  filteredProducts: Array<any> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PackageDetailsComponent>,
    public dbs: DatabaseService
  ) { }

  ngOnInit() {

    console.log(this.data.paquete)
    this.getPackageProducts(this.data.paquete);

  }

  getPackageProducts(packages: Package): void {
    const packageProductsSubs =
      this.dbs.getPackagesProducts(packages.id)
        .pipe(
          map(products => {
            products.forEach((element, index) => {
              element['index'] = index;
            });
            console.log(products)
            return products;
          })
        ).subscribe(products => {
          this.filteredProducts = products;
        });
  }
   /*Cuando hace click fuera del dialog*/
   onNoClick(): void {
    this.dialogRef.close();
  }

}
