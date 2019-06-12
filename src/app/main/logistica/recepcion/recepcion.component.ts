import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';
import { FormControl } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Transfer } from 'src/app/core/ms-types';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
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
export class RecepcionComponent implements OnInit {

  filteredTransfers: Array<any> = [];

  disableTooltips = new FormControl(true);

  displayedColumnsTransfer: string[] = ['index', 'code', 'name', 'quantity', 'serialList', 'observations'];
  dataSourceTransfer = new MatTableDataSource();

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  isOpenTransfer: Array<boolean> = [];
  dataSourceList: Array<any> = [];
  loadingList: Array<boolean> = [];

  subscriptions: Array<Subscription> = [];

  monthsKey: Array<string> =
  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  monthIndex: number;
  currentMonth: string;
  currentYear: number;
  year: number;

  monthFormControl = new FormControl({ value: new Date(), disabled: true });

  constructor(
    public dbs: DatabaseService
  ) { }

  ngOnInit() {
    const transferSubs = this.dbs.currentDataTransfers
      .pipe(
        tap(transfers => {
          this.isOpenTransfer = [];
          this.dataSourceList = [];
          this.loadingList = [];
          transfers.forEach(transfer => {
            this.isOpenTransfer.push(false);
            this.loadingList.push(false);
            this.dataSourceList.push(new MatTableDataSource);
          });
        })
      )
      .subscribe(transfers => {
        this.filteredTransfers = transfers;
      });

    this.subscriptions.push(transferSubs);
  }

  /**
   * @desc Function to filter promotion list based in coincidence
   * @param ref {string} reference to the promotion searched
   */
  filterData(ref: string) {
    ref = ref.toLowerCase();
    this.filteredTransfers = this.dbs.transfers.filter(option =>
      option.docName.toLowerCase().includes(ref) ||
      option.docCorrelative.toString().includes(ref));
  }

  setMonthOfView(event, datepicker): void {
    this.monthFormControl = new FormControl({ value: event, disabled: true });
    this.monthIndex = this.monthFormControl.value.getMonth();
    this.currentMonth = this.monthsKey[this.monthIndex];
    this.currentYear = this.monthFormControl.value.getFullYear();
    let fromDate: Date = new Date(this.currentYear, this.monthIndex, 1);

    let toMonth = (fromDate.getMonth() + 1) % 12;
    let toYear = this.currentYear;

    if (toMonth + 1 >= 13) {
      toYear++;
    }

    let toDate: Date = new Date(toYear, toMonth, 1);

    // this.dbs.getSecuritySubstandardActFreds(this.auth.permits['securityFredPersonalList'], fromDate.valueOf(), toDate.valueOf());
    // this.dbs.getSecuritySubstandardConditionFreds(this.auth.permits['securityFredPersonalList'], fromDate.valueOf(), toDate.valueOf());
    // this.dbs.getSecurityRemarkableActFreds(this.auth.permits['securityFredPersonalList'], fromDate.valueOf(), toDate.valueOf());

    datepicker.close();
  }

  /**
   * @desc Getting the products of a transfer
   * @param transfer {!Transfer} value passed when panel is opened
   */
  getTransferProducts(transfer: Transfer, idx: number): void {
    this.dataSourceList[idx].paginator = this.paginator.toArray()[idx];
    this.dataSourceList[idx].sort = this.sort.toArray()[idx];
    if (!!this.dataSourceList[idx].data.length) { return; }

    this.loadingList[idx] = true;

    const transferProductsSubs =
      this.dbs.getTransferProducts(transfer.id)
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
    this.subscriptions.push(transferProductsSubs);
  }

  /**
   * @desc Function to open just one panel at time.
   * @param index index of the item be toggled
   */
  togglePanelTransfer(index): void {
    this.isOpenTransfer.forEach((element, i) => {
      if (i === index) {
        this.isOpenTransfer[i] = !element;
      } else {
        this.isOpenTransfer[i] = false;
      }
    });
  }

}
