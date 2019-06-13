import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { DatabaseService } from '../core/database.service';
import { MatBottomSheet, MatDialog, MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { CreatePartyComponent } from './crear-tercero/crear-tercero.component';
import { EditPartyComponent } from './editar-tercero/editar-tercero.component';
import { InfoPartyComponent } from './info-tercero/info-tercero.component';
import { ConfirmDeletePartyComponent } from './confirmar-borrar-tercero/confirmar-borrar-tercero.component';

@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styles: []
})
export class PartiesComponent implements OnInit {

  disableTooltips = new FormControl(true);
  filteredParties: Array<any> = [];

  displayedColumns: string[] = ['index', 'type', 'docType', 'docNum', 'name', 'actions'];
  displayedColumnsMobile: string[] = ['index', 'type', 'docNum', 'name', 'actions'];

  dataSource = new MatTableDataSource();
  dataSourceMobile = new MatTableDataSource();

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  constructor(
    public dbs: DatabaseService,
    private dialog: MatDialog,
    public snackbar: MatSnackBar,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {

    this.dbs.currentDataParties.subscribe( parties => {
      this.filteredParties = parties;
      this.dataSource.data = this.filteredParties;
      this.dataSourceMobile.data = this.filteredParties;

    });

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator.toArray()[0];
    this.dataSource.sort = this.sort.toArray()[0];
    this.dataSourceMobile.paginator = this.paginator.toArray()[1];
    this.dataSourceMobile.sort = this.sort.toArray()[1];
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
    this.dataSourceMobile.data = this.filteredParties;
  }

  createParty(): void {
    const dialogRef = this.dialog.open(CreatePartyComponent,{
      panelClass: 'ms-custom-dialogbox'
    });
  }

  editParty(party): void {
    this.dialog.open(EditPartyComponent, {
      data: party,
      panelClass: 'ms-custom-dialogbox'
    })
  }

  showInfo(party){
    this.bottomSheet.open(InfoPartyComponent,{
      data: party
    })
  }
  confirmDelete(party): void{
    var confirmDialogRef = this.dialog.open(ConfirmDeletePartyComponent, {
      data: party,
      panelClass: 'ms-custom-modalbox'
    });

    confirmDialogRef.afterClosed().subscribe( res => {
      if(res === true){
      }else{
        this.snackbar.open('Ufff! ... menos mal te preguntamos', 'Cerrar', {
          duration: 6000
        })
      }
    })
  }

}
