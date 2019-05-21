import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';
import { StateManagementService } from 'src/app/core/state-management.service';
import { SidenavService } from 'src/app/core/sidenav.service';
import { CrearTerceroComponent } from 'src/app/terceros/crear-tercero/crear-tercero.component';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { EditarTicketComponent } from 'src/app/ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-two/editar-ticket/editar-ticket.component';
import { BorrarTicketComponent } from 'src/app/ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-two/borrar-ticket/borrar-ticket.component';

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
  ticketsStateManagement: Array<any> = [];
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
     * @desc Pone a disposicion los datos del cart del ticketsStateManagement
     */
    this.dataSource.data = this.state.ticketsStateManagement[this.state.currentStateIndex].cart;

    /*
     * @desc Pie de tabla que enumera las paginas
     */
    this.dataSource.paginator = this.paginator;
    /*
     * @desc Boton para ordenar los datos de la tabla
     */
    this.dataSource.sort = this.sort;

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
    const dialogRef = this.dialog.open(EditarTicketComponent, {
      data: { name: product.name, sale: product.sale, stock: product.stock, category: product.category, warehouse: product.warehouse, imagePath: this.imagePath },
      panelClass: 'ms-custom-dialogbox'

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  deleteProduct(): void {
  var confirmDialogRef = this.dialog.open(BorrarTicketComponent, {
    panelClass: 'ms-custom-modalbox'
  });
  confirmDialogRef.afterClosed()
  }
}
