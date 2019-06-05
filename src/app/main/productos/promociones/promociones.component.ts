import { MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatabaseService } from 'src/app/core/database.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styles: []
})
export class PromocionesComponent implements OnInit {

  disableTooltips = new FormControl(true);
  filteredPromotions: Array<any> = [];

  constructor(
    public dbs: DatabaseService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.dbs.currentDataPromotions.subscribe(promotions => {
      this.filteredPromotions = promotions;
    });
  }

  filterData(ref: string) {
    ref = ref.toLowerCase();
    this.filteredPromotions = this.dbs.promotions.filter(option =>
      option['category'].toLowerCase().includes(ref) ||
      option['warehouse'].toLowerCase().includes(ref) ||
      option['code'].toLowerCase().includes(ref) ||
      option['name'].toLowerCase().includes(ref) ||
      option['unit'].toLowerCase().includes(ref) ||
      option['stock'].toString().includes(ref) ||
      option['purchase'].toString().includes(ref) ||
      option['sale'].toString().includes(ref));
  }

  createPromo(): void{
    
  }

}
