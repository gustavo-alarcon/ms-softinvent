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
import { Ticket } from 'src/app/core/ms-types';

@Component({
  selector: 'app-ms-ventas-step-two',
  templateUrl: './ms-ventas-step-two.component.html',
  styles: []
})
export class MsSalesStepTwoComponent implements OnInit {
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
  currentTicket: Ticket;

  constructor(
    private sidenav: SidenavService,
    public dbs: DatabaseService,
    private state: StateManagementService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    /*
     * @desc third-party filtering
     * @param ref docNum: Referential value to perform the search of the third party
     */
    this.filteredParties = this.partyFromList.valueChanges
      .pipe(
        startWith<any>(''),
        map(value => typeof value === 'string' ? value.toLowerCase() : value.name.toLowerCase()),
        map(docNum => docNum ? this.dbs.parties.filter(option => option['docNum'].toLowerCase().includes(docNum)) : this.dbs.parties)
      );
    /*
     * @desc Make available the currentState cart data
     */
    let temp = this.state.ticketsStateManagement.subscribe(res => {
      this.state.currentState = res;
      this.dataSource.data = this.state.currentState[this.state.currentStateIndex].cart;
    })
    /*
     * @desc Table foot that lists the pages
     */
    this.dataSource.paginator = this.paginator;
    /*
     * @desc Button to sort the data in the table
     */
    this.dataSource.sort = this.sort;

  }
  /* creatyParty() open the add third dialog
   * @product{ string [] } : List of third-party fields
   * void : Without returns
   */
  createParty(): void {
    const dialogRef = this.dialog.open(CreatePartyComponent, {
      panelClass: 'ms-custom-dialogbox'
    });
  }
  /* showPartySelected() open the party variable 
   * @product{ string [] } : array of party
   * void : returns the name if the docNum matches
   */
  showPartySelected(party): string | undefined {
    return party ? party['name'] : undefined;
  }
  /* editProduct() open the dialog to add a product NOTE: missing full fields
   * @product{ string [] } : List of the fields of the product selected in the table
   * void : Without returns
   */
  editProduct(product): void {
    const dialogRef = this.dialog.open(EditTicketComponent, {
      data: {
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
  * @desc  delete the product in the cart
  * @param {!product[]} actual product
  * @return { void } : Without returns
  */
  deleteProduct(product): void {
    this.state.deleteProduct(product);
  }

}
