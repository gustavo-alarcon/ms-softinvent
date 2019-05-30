import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';
import { StateManagementService } from 'src/app/core/state-management.service';
import { SidenavService } from 'src/app/core/sidenav.service';
import { CreatePartyComponent } from 'src/app/terceros/crear-tercero/crear-tercero.component';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { EditTicketComponent } from 'src/app/ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-two/editar-ticket/editar-ticket.component';
import { Ticket, ProductCart } from 'src/app/core/ms-types';
import { GenerateTicketComponent } from './generar-ticket/generar-ticket.component';
import { ConfirmDeleteComponent } from './confirmacion-delete/confirmacion-delete.component';
import { EditStockComponent } from './edit-stock/edit-stock.component';

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
  flag2: boolean = false;

  /**
   * 
   * VARIABLES FALTANTES
   */
  selectedType = new FormControl();
  partyFromList = new FormControl();
  currentTicket: Ticket;

  constructor(
    public sidenav: SidenavService,
    public dbs: DatabaseService,
    public state: StateManagementService,
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
     * @desc Pone a disposicion los datos del cart del currentState
     */
    let temp = this.state.ticketsStateManagement.subscribe(res => {
      this.state.currentState = res;
      if (this.state.currentState[this.state.currentStateIndex]) {
        this.dataSource.data = this.state.currentState[this.state.currentStateIndex].cart;
      }
    })
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
    const dialogRef = this.dialog.open(CreatePartyComponent, {
      panelClass: 'ms-custom-dialogbox'
    });
  }
  /* showPartySelected() open the party variable
   * @product{ string [] } : array of party
   * void : return the name if the el docNum if it matches
   */
  showPartySelected(party): string | undefined {
    return party ? party['name'] : undefined;
  }
  /* editProduct() abre el dialog de agregar un producto NOTA: falta mostrar los campos llenos
   * @product{ string [] } : Lista de los campos del producto seleccionado en la tabla
   * void : no retorna nada 
   */
  editProduct(product): void {
    const dialogRef = this.dialog.open(EditTicketComponent, {
      data: {
        index: product.index,
        name: product.name,
        sale: product.sale,
        salePrice: product.salePrice,
        stock: product.stock,
        category: product.category,
        warehouse: product.warehouse,
        imagePath: this.imagePath,
        quantity: product.quantity,
        discountType: product.discountType,
        discount: product.discount,
      },
      panelClass: 'ms-custom-dialogbox'

    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  /*
  * @desc remove a product from the cart
  * @param {!product[]} actual product
  * @return { void } : Without returns
  */
  ConfirmDeleteProduct(product: ProductCart): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: product,
      panelClass: 'ms-custom-dialogbox'
    });
  }
  /*
  *@desc generates a new ticket if the stock of produc is less than the quantity, else show a dialog
  *return {void} : Without returns
  */
  GenerateTicket(): void {
    /*@const @private {flag} this variable indicates the state of the condition*/
    let flag: boolean = false;
    if (this.state.currentState[this.state.currentStateIndex].cart) {
      if (this.state.currentState[this.state.currentStateIndex].cart.length > 0) {
        console.log(this.state.currentState[this.state.currentStateIndex].cart.length)
        this.state.currentState[this.state.currentStateIndex].cart.forEach((product, index) => {
          console.log(index, product.stock, product.quantity)
          if (product.stock < product.quantity) {
            flag = true;
          }
        });
        if (flag) {
          console.log("fuera de stock")
          const dialogRef = this.dialog.open(EditStockComponent, {
            panelClass: 'ms-custom-dialogbox'
          });
        }
        else {
          console.log("generar ticket")
          const dialogRef = this.dialog.open(GenerateTicketComponent, {
            panelClass: 'ms-custom-dialogbox'
          });
        }
      }
    }
  }
}
