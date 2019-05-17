import { Component, OnInit } from '@angular/core';
import { Ticket, Product } from '../../core/ms-types';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/core/sidenav.service';
import { StateManagementService } from 'src/app/core/state-management.service';

@Component({
  selector: 'app-ms-sidenav-tickets-products',
  templateUrl: './ms-sidenav-tickets-products.component.html',
  styles: []
})
export class MsSidenavTicketsProductsComponent implements OnInit {

  sidenavTickets: boolean = true;

  

  currentTicket: Ticket;

  constructor(
    private sidenav: SidenavService,
    private state: StateManagementService
  ) {
    this.changeCurrentTicket(0);
  }

  ngOnInit() {
  }

  changeCurrentTicket(index): void {
    this.currentTicket = this.state.ticketsStateManagement[index];
    this.state.currentStateIndex = index;
    this.calcTotalSalePrice();
  }

  calcTotalSalePrice(): void{
    let _total = 0;
    let _discount = 0;
    this.currentTicket.cart.forEach(prod => {
      _discount += prod.discount.amount * prod.quantity;
      _total += prod.price * prod.quantity
    })
    this.currentTicket.totalWithoutDiscount = _total;
    this.currentTicket.totalDiscount = _discount;
    this.currentTicket.totalWithDiscount = _total - _discount;
  }

}
