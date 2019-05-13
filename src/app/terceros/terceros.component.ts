import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../core/database.service';
import { MatBottomSheet, MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import { CrearTerceroComponent } from './crear-tercero/crear-tercero.component';
import { EditarTerceroComponent } from './editar-tercero/editar-tercero.component';
import { InfoTerceroComponent } from './info-tercero/info-tercero.component';

@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styles: []
})
export class TercerosComponent implements OnInit {

  disableTooltips = new FormControl(true);
  filteredParties: Array<any> = [];

  displayedColumns: string[] = ['index', 'type', 'docType', 'docNum', 'name', 'Editar'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dbs: DatabaseService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {

    this.dbs.currentDataParties.subscribe( parties => {
      this.filteredParties = parties;
      this.dataSource.data = this.filteredParties;
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  filterData(ref: string) {
    ref = ref.toLowerCase();
    this.filteredParties = this.dbs.parties.filter(option => 
      option['type'].toLowerCase().includes(ref) ||
      option['name'].toLowerCase().includes(ref) ||
      option['docType'].toLowerCase().includes(ref) ||
      option['docNum'].toLowerCase().includes(ref) ||
      option['address'].toLowerCase().includes(ref) ||
      option['contact']['name'].toString().includes(ref) ||
      option['contact']['lastname'].toString().includes(ref) ||
      option['contact']['email'].toString().includes(ref) ||
      option['contact']['phone'].toString().includes(ref));
    this.dataSource.data = this.filteredParties;
  }

  createParty(): void {
    const dialogRef = this.dialog.open(CrearTerceroComponent,{
      panelClass: 'ms-custom-dialogbox'
    });
  }

  editParty(party): void {
    this.dialog.open(EditarTerceroComponent, {
      data: party,
      panelClass: 'ms-custom-dialogbox'
    })
  }

  showInfo(party){
    this.bottomSheet.open(InfoTerceroComponent,{
      data: party
    })
  }

}
