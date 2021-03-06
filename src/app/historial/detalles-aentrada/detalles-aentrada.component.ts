import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-detalles-aentrada',
  templateUrl: './detalles-aentrada.component.html',
  styles: []
})
export class DetailsForEntryComponent implements OnInit {

  displayedColumns: string[] = ['index', 'quantity', 'productName'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  total: number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

    this.dataSource.data = this.data['productList'];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

}
