import { Component, OnInit } from '@angular/core';
import { Ticket, Product, ProductCart } from '../../core/ms-types';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/core/sidenav.service';
import { StateManagementService } from 'src/app/core/state-management.service';
import { MattabService } from 'src/app/core/mattab.service';
import { DataSource } from '@angular/cdk/table';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

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
    private mat: MattabService
  ) {
    this.changeCurrentTicket(0);
  }


  ngOnInit() {
    let ticketsSubs = this.state.ticketsStateManagement.subscribe(res => {
      this.state.currentState = res;
      this.currentTicket =
        this.state.currentState[this.state.currentStateIndex];
      console.log('Obs:',this.currentTicket);
    })

    this.subscriptions.push(ticketsSubs);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

  changeCurrentTicket(index): void {
    if (this.state.currentState.length) {
      this.currentTicket = this.state.currentState[index];
      this.state.currentStateIndex = index;
      this.state.calcTotalSalePrice();
    } else {
      this.snackbar.open("No hay tickets abiertos ...", "Cerrar", {
        duration: 6000
      })
    }
  }
  /**
  * @desc  agrega un nuevo ticket 
  * @param {!Number[]} index  :indice del nuevo ticker a crear
  * @return { void } : Sin retornos
  */
  addTicket(index): void {
    let productList: Array<ProductCart> = [];
    let ticket: Ticket = { cart: productList };
    this.state.currentStateIndex = index;
    this.state.agregarTicket(ticket);
    
  }

  /**
  * @desc  elimina a un ticker de la lista de tickets
  * @param {!Number[]} index indice del ticket a eliminar
  * @return { void } : Sin retornos
  */
  deleteTicket(index): void {
    this.state.eliminarTicket(index);
    this.state.calcTotalSalePrice();
  }
  /**
  * @desc  elimina a un producto del carrito
  * @param {!producto[]} product producto actual
  * @return { void } : Sin retornos
  */
  deleteProduct(product): void {
    this.state.eliminarProducto(product);
    this.state.calcTotalSalePrice();
  }
}
