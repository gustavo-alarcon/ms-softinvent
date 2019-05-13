import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../core/database.service';
import { MatDialog, MatBottomSheet, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import { CrearDocumentoComponent } from './crear-documento/crear-documento.component';
import { EditarDocumentoComponent } from './editar-documento/editar-documento.component';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styles: []
})
export class DocumentosComponent implements OnInit {

  disableTooltips = new FormControl(true);
  filteredDocuments: Array<any> = [];

  displayedColumns: string[] = ['index', 'alias', 'name', 'partyType', 'nature', 'serie', 'correlativeRange', 'Editar'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dbs: DatabaseService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {

    this.dbs.currentDataDocuments.subscribe( document => {
      this.filteredDocuments = document;
      this.dataSource.data = this.filteredDocuments;
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  filterData(ref: string) {
    ref = ref.toLowerCase();
    this.filteredDocuments = this.dbs.documents.filter(option => 
      option['alias'].toLowerCase().includes(ref) ||
      option['name'].toLowerCase().includes(ref) ||
      option['partyType'].toLowerCase().includes(ref) ||
      option['nature'].toLowerCase().includes(ref) ||
      option['serie'].toLowerCase().includes(ref) ||
      option['initialCorrelative'].toString().includes(ref) ||
      option['actualCorrelative'].toString().includes(ref));
    this.dataSource.data = this.filteredDocuments;
  }

  createDocument(): void {
    const dialogRef = this.dialog.open(CrearDocumentoComponent,{
      panelClass: 'ms-custom-dialogbox'
    });
  }

  editDocument(document): void {
    this.dialog.open(EditarDocumentoComponent, {
      data: document,
      panelClass: 'ms-custom-dialogbox'
    })
  }

}
