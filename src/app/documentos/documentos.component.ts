import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../core/database.service';
import { MatDialog, MatBottomSheet, MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { CreateDocComponent } from './crear-documento/crear-documento.component';
import { EditDocComponent } from './editar-documento/editar-documento.component';
import { ConfirmDeleteDocComponent } from './confirmar-borrar-documento/confirmar-borrar-documento.component';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styles: []
})
export class DocsComponent implements OnInit {

  disableTooltips = new FormControl(true);
  filteredDocuments: Array<any> = [];

  displayedColumns: string[] = ['index', 'alias', 'name', 'partyType', 'nature', 'serie', 'correlativeRange', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dbs: DatabaseService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {

    this.dbs.currentDataDocuments.subscribe(document => {
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
    const dialogRef = this.dialog.open(CreateDocComponent, {
      panelClass: 'ms-custom-dialogbox'
    });
  }

  editDocument(document): void {
    this.dialog.open(EditDocComponent, {
      data: document,
      panelClass: 'ms-custom-dialogbox'
    });
  }

  deleteDocument(document): void {
    const confirmDialogRef = this.dialog.open(ConfirmDeleteDocComponent, {
      data: document,
      panelClass: 'ms-custom-dialogbox'
    });

    confirmDialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this.snackbar.open('Listo! ... documento borrado', 'Cerrar', {
          duration: 6000
        });
      } else {
        this.snackbar.open('Ufff! ... menos mal te preguntamos', 'Cerrar', {
          duration: 6000
        });
      }
    });
  }

}
