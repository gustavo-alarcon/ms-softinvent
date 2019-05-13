import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog, MatBottomSheet } from '@angular/material';
import { DatabaseService } from '../core/database.service';
import { ConfirmarAnularComponent } from './confirmar-anular/confirmar-anular.component';
import { DetallesSalidaComponent } from './detalles-salida/detalles-salida.component';
import { DetallesTransferenciaComponent } from './detalles-transferencia/detalles-transferencia.component';
import { DetallesEntradaComponent } from './detalles-entrada/detalles-entrada.component';
import { DetallesAentradaComponent } from './detalles-aentrada/detalles-aentrada.component';
import { DetallesAsalidaComponent } from './detalles-asalida/detalles-asalida.component';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styles: []
})
export class HistorialComponent implements OnInit {
  
  disableTooltips = new FormControl(true);
  startFormControl  = new FormControl();
  endFormControl    = new FormControl();
  natureFormControl  = new FormControl();

  filteredHistory:  Array<any> = [];

  displayedColumns: string[] = ['index', 'regDate', 'documentName', 'serie', 'correlative', 'partyName', 'cancel'];
  // displayedColumns: string[] = ['index', 'regDate', 'documentName', 'serie', 'correlative', 'totalImport', 'partyName', 'vendorName', 'cancel'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  total: any = 0;

  constructor(
    public dbs: DatabaseService,
    public snackbar: MatSnackBar,
    public dialog: MatDialog,
    public bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {

    this.dbs.currentDataHistory.subscribe( res => {
      this.filteredHistory = res;
      this.dataSource.data = this.filteredHistory;

      this.total = 0;
      this.filteredHistory.forEach( option => {
        if(option['state'] != 'Anulado'){
          this.total += option['totalImport'];
        }
      })
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.natureFormControl.valueChanges.subscribe( res => {

      if(res === 'SALIDA'){
        this.displayedColumns = ['index', 'regDate', 'documentName', 'serie', 'correlative', 'totalImport', 'partyName', 'vendorName', 'cancel'];
      }else{
        this.displayedColumns = ['index', 'regDate', 'documentName', 'serie', 'correlative', 'partyName', 'cancel'];
      }

    });

  }

  filterData(ref): void {
    ref = ref.toLowerCase();

    this.filteredHistory = this.dbs.history.filter( option => 
      option['documentName'].toLowerCase().includes(ref) ||
      option['correlative'].toString().includes(ref) ||
      option['serie'].toLowerCase().includes(ref) ||
      option['state'].toLowerCase().includes(ref) ||
      option['partyDoc'].toLowerCase().includes(ref) ||
      option['partyDocNum'].toLowerCase().includes(ref) ||
      option['partyName'].toLowerCase().includes(ref) ||
      option['vendorName'].toLowerCase().includes(ref) ||
      option['warehouseOrigin'].toLowerCase().includes(ref) ||
      option['warehouseDestination'].toLowerCase().includes(ref))
    
      this.total = 0;
      this.filteredHistory.forEach( option => {
        if(option['state'] != 'Anulado'){
          this.total += option['totalImport'];
        }
      })

    this.dataSource.data = this.filteredHistory;
  }

  cancelDocument(movement): void{
    this.dialog.open(ConfirmarAnularComponent, {
      data: movement,
      panelClass: 'ms-custom-dialogbox'
    })
  }

  showDetails(document): void {

    if(document['documentNature'] === 'SALIDA'){
      this.dialog.open(DetallesSalidaComponent, {
        data: document,
        panelClass: 'ms-custom-dialogbox'
      })
    }

    if(document['documentNature'] === 'AJUSTE DE SALIDA'){
      this.dialog.open(DetallesAsalidaComponent, {
        data: document,
        panelClass: 'ms-custom-dialogbox'
      })
    }

    if(document['documentNature'] === 'TRANSFERENCIA'){
      this.dialog.open(DetallesTransferenciaComponent, {
        data: document,
        panelClass: 'ms-custom-dialogbox'
      })
    }

    if(document['documentNature'] === 'ENTRADA'){
      this.dialog.open(DetallesEntradaComponent, {
        data: document,
        panelClass: 'ms-custom-dialogbox'
      })
    }

    if(document['documentNature'] === 'AJUSTE DE ENTRADA'){
      this.dialog.open(DetallesAentradaComponent, {
        data: document,
        panelClass: 'ms-custom-dialogbox'
      })
    }

  }

  queryHistory(): void {

    let ready = true;

    if(!this.startFormControl.value){
      this.snackbar.open('Seleccione una fecha de inicio para realizar la búsqueda', 'Cerrar', {
        duration: 6000
      });
      ready = false;
      return;
    }

    if(!this.endFormControl.value){
      this.snackbar.open('Seleccione una fecha límite para realizar la búsqueda', 'Cerrar', {
        duration: 6000
      });
      ready = false;
      return;
    }

    if(!this.natureFormControl.value){
      this.snackbar.open('Seleccione el tipo de documentos a buscar', 'Cerrar', {
        duration: 6000
      });
      ready = false;
      return;
    }

    if(ready){
      this.dbs.getHistory(this.natureFormControl.value, this.startFormControl.value.valueOf(), this.endFormControl.value.valueOf());
    }
    
  }


}
