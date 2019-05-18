import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';
import { StateManagementService } from 'src/app/core/state-management.service';
import { SidenavService } from 'src/app/core/sidenav.service';
import { CrearTerceroComponent } from 'src/app/terceros/crear-tercero/crear-tercero.component';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MsTicketDialogProductMovementComponent } from 'src/app/ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-one/ms-ticket-dialog-product-movement/ms-ticket-dialog-product-movement.component';

@Component({
  selector: 'app-ms-ticket-step-two',
  templateUrl: './ms-ticket-step-two.component.html',
  styles: []
})
export class MsTicketStepTwoComponent implements OnInit {
  filteredParties: Observable<any>;
  /**
   * VARIABLES GABY
   */
  disableTooltips = new FormControl(true);
  filteredProducts: Array<any> = [];
  displayedColumns: string[] = ['name', 'stock', 'sale', 'warehouse', 'editar', 'borrar'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  imagePath: string;
  description: string;
  name: string;
  sale: string;

  /**
   * 
   * VARIABLES FALTANTES
   */
  selectedType = new FormControl();
  partyFromList = new FormControl();

  constructor(
    private sidenav: SidenavService,
    public dbs: DatabaseService,
    private state: StateManagementService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    /*
     * @desc Función para filtrado de terceros
     * @param ref docNum: Valor referencial para realizar la búsqueda del tercero
     */
    this.filteredParties = this.partyFromList.valueChanges
      .pipe(
        startWith<any>(''),
        map(value => typeof value === 'string' ? value.toLowerCase() : value.name.toLowerCase()),
        map(docNum => docNum ? this.dbs.parties.filter(option => option['docNum'].toLowerCase().includes(docNum)) : this.dbs.parties)
      );
    /*
     * @desc Pone a disposicion los datos de los productos del DataBaseService 
     */
    this.dbs.currentDataProducts.subscribe(products => {
      this.filteredProducts = products;
      this.dataSource.data = this.filteredProducts;
    });
    /*
     * @desc Pie de tabla que enumera las paginas
     */
    this.dataSource.paginator = this.paginator;
    /*
     * @desc Boton para ordenar los datos de la tabla
     */
    this.dataSource.sort = this.sort;

  }
  /*
   * @desc Función para filtrado de productos basada en coincidencia parcial
   * @param ref { string }: Valor referencial para realizar la búsqueda en productos
   */
  filterData(ref: string) {
    ref = ref.toLowerCase();
    this.filteredProducts = this.dbs.products.filter(option =>
      option['category'].toLowerCase().includes(ref) ||
      option['warehouse'].toLowerCase().includes(ref) ||
      option['name'].toLowerCase().includes(ref) ||
      option['stock'].toString().includes(ref) ||
      option['sale'].toString().includes(ref));
    this.dataSource.data = this.filteredProducts;
  }
  /* creatyParty() abre el dialog de agregar tercero
   * @product{ string [] } : Lista de los campos del tercero
   * void : no retorna nada
   */
  createParty(): void {
    const dialogRef = this.dialog.open(CrearTerceroComponent, {
      panelClass: 'ms-custom-dialogbox'
    });
  }
  /* showPartySelected() abre la variable party
   * @product{ string [] } : array de party
   * void : retorna el nombre si el docNum coincide
   */
  showPartySelected(party): string | undefined {
    return party ? party['name'] : undefined;
  }
  /* editProduct() abre el dialog de agregar un producto NOTA: falta mostrar los campos llenos
   * @product{ string [] } : Lista de los campos del producto seleccionado en la tabla
   * void : no retorna nada 
   */
  editProduct(product): void {
    const dialogRef = this.dialog.open(MsTicketDialogProductMovementComponent, {
      data: { name: product.name, sale: product.sale, stock: product.stock, category: product.category, warehouse: product.warehouse, imagePath: this.imagePath },
      panelClass: 'ms-custom-dialogbox'

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
