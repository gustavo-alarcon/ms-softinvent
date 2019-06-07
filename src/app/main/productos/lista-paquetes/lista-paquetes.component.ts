import { tap, map } from 'rxjs/operators';
import { MatDialog, MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatabaseService } from 'src/app/core/database.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Package } from 'src/app/core/ms-types';
import { PackageDetailsComponent } from './package-details/package_details.component';

@Component({
  selector: 'app-lista-paquetes',
  templateUrl: './lista-paquetes.component.html',
  animations: [
    trigger('openClosePanelMobile', [
      state('openPanelMobile', style({
        height: '170px',
        opacity: 0.8,
        borderRadius: '10px 10px 0px 0px',
        marginBottom: '0em'
      })),
      state('closedPanelMobile', style({
        height: '170px',
        opacity: 1,
        borderRadius: '10px 10px 10px 10px',
        marginBottom: '1em'
      })),
      transition('openPanelMobile => closedPanelMobile', [
        animate('1s ease-in')
      ]),
      transition('closedPanelMobile => openPanelMobile', [
        animate('0.5s ease-out')
      ])
    ]),
    trigger('openCloseTable', [
      state('openTable', style({
        maxHeight: '4000px',
        opacity: 1
      })),
      state('closedTable', style({
        height: '0px',
        opacity: 0
      })),
      transition('openTable => closedTable', [
        animate('1s ease-in')
      ]),
      transition('closedTable => openTable', [
        animate('0.5s ease-in')
      ])
    ]),
    trigger('openCloseTableMobile', [
      state('openTableMobile', style({
        maxHeight: '10000px',
        opacity: 1,
        marginBottom: '1em'
      })),
      state('closedTableMobile', style({
        height: '0px',
        opacity: 0,
        marginBottom: '0em',
        display: 'none'
      })),
      transition('openTableMobile => closedTableMobile', [
        animate('1s ease-in')
      ]),
      transition('closedTableMobile => openTableMobile', [
        animate('0.5s ease-in')
      ])
    ]),
    trigger('openCloseArrow', [
      state('openArrow', style({
        transform: 'rotate(0deg)'
      })),
      state('closedArrow', style({
        transform: 'rotate(180deg)'
      })),
      transition('openArrow => closedArrow', [
        animate('1s ease-in')
      ]),
      transition('closedArrow => openArrow', [
        animate('0.5s ease-in')
      ])
    ])
  ]
})
export class ListaPaquetesComponent implements OnInit {

  disableTooltips = new FormControl(true);
  filteredPackage: Array<any> = [];
  filteredProducts: Array<any> = [];
  allFilteredProducts :Array<Array<any>> = [];
  displayedColumnsPackage: string[] = ['index', 'code', 'name', 'category','unit','sale','quantity'];
  dataSourcePackage = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  isOpenPromo: Array<boolean> = [];

  subscriptions: Array<Subscription> = [];

  constructor(
    public dbs: DatabaseService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    const promoSubs = this.dbs.currentDataPackages
      .pipe(
        tap(promos => {
          promos.forEach(pack => {
            this.isOpenPromo.push(false);
            this.getPackageProducts(pack);
          });
        })
      )
      .subscribe(packages => {
        this.filteredPackage = packages;
      });

    this.subscriptions.push(promoSubs);

  }

  /**
   * @desc Function to filter promotion list based in coincidence
   * @param ref {string} reference to the promotion searched
   */
  filterData(ref: string) {
    ref = ref.toLowerCase();
    this.filteredPackage = this.dbs.promotions.filter(option =>
      option.name.toLowerCase().includes(ref));
  }

  /**
   * @desc Getting the products of a promo
   * @param promo {!Promo} value passed when panel is opened
   */
  getPackageProducts(packages: Package): void {
    const packageProductsSubs =
      this.dbs.getPackagesProducts(packages.id)
        .pipe(
          map(products => {
            products.forEach((element, index) => {
              element['index'] = index;
            });
            this.allFilteredProducts.push(products);
            return products;
          })
        )
        .subscribe(products => {
          this.dataSourcePackage.data = products;
        });
    this.subscriptions.push(packageProductsSubs);
  }

  /**
   * @desc Function to open just one panel at time.
   * @param index index of the item be toggled
   */
  togglePanelPackage(index): void {
    this.isOpenPromo.forEach((element, i) => {
      if (i === index) {
        this.isOpenPromo[i] = !element;
      } else {
        this.isOpenPromo[i] = false;
      }
    });
  }

  /**
   * @desc Function to create a new promotion
   */
  createPromo(): void {

  }

  /**
   * @desc Function to toggle the active state of a promotion
   */
  toggleActive(promo: Package): void {

  }

  /**
   * @desc Function to edit a promotion
   * @param promo reference to the promotion to be edited
   */
  editPackage(promo: Package): void {

  }

  /**
   * @desc Function to delete a promotion
   * @param promo reference to the promotion to be deleted
   */
  deletePackage(promo: Package): void {
    console.log(this.allFilteredProducts);
  }

 /**
   * @desc Function to delete a promotion
   * @param promo reference to the promotion to be deleted
   */
  moreProducts(pack: Package): void {
    const dialogRef = this.dialog.open(PackageDetailsComponent, {
      data: { paquete: pack},
      panelClass: 'ms-custom-dialogbox'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
