import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { CrearTrasladoComponent } from './crear-traslado/crear-traslado.component';

@Component({
  selector: 'app-traslados',
  templateUrl: './traslados.component.html',
  styles: []
})
export class TrasladosComponent implements OnInit {

  filteredPromotions: Array<any> = [];

  disableTooltips = new FormControl(true);

  monthsKey: Array<string> =
  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  monthIndex: number;
  currentMonth: string;
  currentYear: number;
  year: number;

  monthFormControl = new FormControl({ value: new Date(), disabled: true });
  
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
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
  createDocument() : void {
    const dialogRef = this.dialog.open(CrearTrasladoComponent, {
      data: { 
        paquete: ' ' ,
      },
      panelClass: 'ms-custom-dialogbox'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
