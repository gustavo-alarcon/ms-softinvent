import { Component, OnInit } from '@angular/core';
import { Ticket, Product, ProductCart } from '../../core/ms-types';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/core/sidenav.service';
import { StateManagementService } from 'src/app/core/state-management.service';
import { MattabService } from 'src/app/core/mattab.service';
import { DataSource } from '@angular/cdk/table';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { state } from '@angular/animations';
import { ConfirmDeleteComponent } from './ms-ticket-step-two/confirmacion-delete/confirmacion-delete.component';
import { ConfirmDeleteTicketComponent } from './confirmacion-delete-ticket/confirmacion-delete-ticket.component';

@Component({
  selector: 'app-ms-sidenav-tickets-products',
  templateUrl: './ms-sidenav-tickets-products.component.html',
  styles: []
})
export class MsSidenavTicketsProductsComponent implements OnInit {

  sidenavTickets: boolean = true;
  currentTicket: Ticket;
  currentCart: ProductCart;
  subscriptions: Array<Subscription> = [];

  constructor(
    private sidenav: SidenavService,
    private state: StateManagementService,
    private snackbar: MatSnackBar,
    private mat: MattabService,
    private dialog: MatDialog
  ) {
    this.changeCurrentTicket(0);
  }
  ngOnInit() {
    let ticketsSubs = this.state.ticketsStateManagement.subscribe(res => {
      this.state.currentState = res;
      this.currentTicket =
        this.state.currentState[this.state.currentStateIndex];
      console.log('Obs:', this.currentTicket);
    })

    this.subscriptions.push(ticketsSubs);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }
  /*
  * @desc changes the actual ticket 
  * @param {!Number[]} index: index of the tickets
  * @return { void } : Without returns
  */
  changeCurrentTicket(index): void {
    if (this.state.currentState.length) {
      this.currentTicket = this.state.currentState[index];
      this.state.currentStateIndex = index;
      this.state.calcTotalSalePrice();
      this.state.changeTicket();
    } else {
      this.snackbar.open("No hay tickets abiertos ...", "Cerrar", {
        duration: 6000
      })
    }
  }
  /*
  * @desc  agrega un nuevo ticket 
  * @param {!Number[]} index  :indice del nuevo ticker a crear
  * @return { void } : Without returns
  */
  addTicket(): void {
    this.state.addTicket();
  }
  /*
  * @desc open ConfirmDeleteComponent dialog
  * @param {!product[]} actual product
  * @return { void } : Without returns
  */
  ConfirmDeleteProduct(product): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      panelClass: 'ms-custom-dialogbox'
    });
  }
  /*
  * @desc open ConfirmDeleteTicketComponent dialog
  * @param {!producto[]} actual product
  * @return { void } : Without returns
  */
  ConfirmDeleteTicket(product): void {
    this.dialog.open(ConfirmDeleteTicketComponent, {
      panelClass: 'ms-custom-dialogbox'
    }).afterClosed().subscribe(res => {
      if(res){
        this.sidenav.sidenavTicketList()
      }
    })
  }
}
