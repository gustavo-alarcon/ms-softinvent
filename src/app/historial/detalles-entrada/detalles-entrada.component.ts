import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-detalles-entrada',
  templateUrl: './detalles-entrada.component.html',
  styles: []
})
export class DetallesEntradaComponent implements OnInit {

  displayedColumns: string[] = ['index', 'quantity', 'productName', 'unitPrice', 'import'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  total: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

    this.data['productList'].forEach(product => {
      this.total += product['import'];
    });

    this.dataSource.data = this.data['productList'];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

}
