import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styles: []
})
export class RecepcionComponent implements OnInit {

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
    public dbs: DatabaseService
  ) { }

  ngOnInit() {
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

}
