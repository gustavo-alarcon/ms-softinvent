import { tap, map } from 'rxjs/operators';
import { MatDialog, MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatabaseService } from 'src/app/core/database.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Promo, PromoProduct } from 'src/app/core/ms-types';
import { CrearPromocionComponent } from './crear-promocion/crear-promocion.component';
import { EditarPromocionComponent } from './editar-promocion/editar-promocion.component';
import { ConfirmarBorrarPromocionComponent } from './confirmar-borrar-promocion/confirmar-borrar-promocion.component';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
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
export class PromocionesComponent implements OnInit, AfterViewInit {

  disableTooltips = new FormControl(true);
  filteredPromotions: Array<any> = [];

  displayedColumnsPromo: string[] = ['index', 'code', 'name', 'category'];
  dataSourcePromo = new MatTableDataSource();

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChild(MatSort) sort: MatSort;

  promoProducts: Array<PromoProduct> = [];

  isOpenPromo: Array<boolean> = [];
  dataSourceList: Array<any> = [];
  loadingList: Array<boolean> = [];

  subscriptions: Array<Subscription> = [];

  constructor(
    public dbs: DatabaseService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {

    const promoSubs = this.dbs.currentDataPromotions
      .pipe(
        tap(promos => {
          this.isOpenPromo = [];
          this.dataSourceList = [];
          this.loadingList = [];
          promos.forEach(promo => {
            this.isOpenPromo.push(false);
            this.loadingList.push(false);
            this.dataSourceList.push(new MatTableDataSource);
          });
        })
      )
      .subscribe(promotions => {
        this.filteredPromotions = promotions;
      });

    this.subscriptions.push(promoSubs);
  }

  ngAfterViewInit() {

    // this.dataSourceList.forEach((element, index) => {
    //   element.paginator = this.paginator.toArray()[index];
    // });
  }

  /**
   * @desc Function to filter promotion list based in coincidence
   * @param ref {string} reference to the promotion searched
   */
  filterData(ref: string) {
    ref = ref.toLowerCase();
    this.filteredPromotions = this.dbs.promotions.filter(option =>
      option.name.toLowerCase().includes(ref));
  }

  /**
   * @desc Getting the products of a promo
   * @param promo {!Promo} value passed when panel is opened
   */
  getPromoProducts(promo: Promo, idx: number): void {
    this.dataSourceList[idx].paginator = this.paginator.toArray()[idx];
    if (!!this.dataSourceList[idx].data.length) { return; }

    this.loadingList[idx] = true;

    const promoProductsSubs =
      this.dbs.getPromoProducts(promo.id)
        .pipe(
          map(products => {
            products.forEach((element, index) => {
              element['index'] = index;
            });
            return products;
          })
        )
        .subscribe(products => {
          this.dataSourceList[idx].data = products;
          this.loadingList[idx] = false;
        });
    this.subscriptions.push(promoProductsSubs);
  }

  /**
   * @desc Function to open just one panel at time.
   * @param index index of the item be toggled
   */
  togglePanelPromo(index): void {
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
    this.dialog.open(CrearPromocionComponent, {
      panelClass: ['ms-custom-dialogbox']
    });
  }

  /**
   * @desc Function to toggle the active state of a promotion
   */
  toggleActive(promo: Promo): void {
    this.dbs.promotionsCollection
      .doc(promo.id).
      update({ active: !promo.active })
      .then(() => {
        this.snackbar.open('Listo!', 'Cerrar', {
          duration: 6000
        });
      })
      .catch(err => {
        console.log(err);
        this.snackbar.open(err, 'Cerrar', {
          duration: 6000
        });
      });
  }

  /**
   * @desc Function to edit a promotion
   * @param promo reference to the promotion to be edited
   */
  editPromo(promo: Promo) {
    this.dialog.open(EditarPromocionComponent, {
      data: {
        promo: promo
      },
      panelClass: ['ms-custom-dialogbox']
    });
  }

  /**
   * @desc Function to delete a promotion
   * @param promo reference to the promotion to be deleted
   */
  deletePromo(promo: Promo): void {
    this.dialog.open(ConfirmarBorrarPromocionComponent, {
      data: {
        promo: promo
      },
      panelClass: ['ms-custom-dialogbox']
    });
  }

}
