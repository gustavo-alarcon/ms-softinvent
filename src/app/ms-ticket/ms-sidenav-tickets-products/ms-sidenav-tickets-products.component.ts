import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../core/ms-types';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/core/sidenav.service';

@Component({
  selector: 'app-ms-sidenav-tickets-products',
  templateUrl: './ms-sidenav-tickets-products.component.html',
  styles: []
})
export class MsSidenavTicketsProductsComponent implements OnInit {

  sidenavTickets: boolean = true;

  ticketsStateManagement: Ticket[] = [
    {cart: [], customer: 'Milagros, Palomino'},
    {cart: [], customer: 'Gabriela, Nuñez'},
    {cart: [], customer: 'Eduardo, Mollinedo'},
    {cart: [], customer: 'Gustavo, Alarcón'}
  ];

  constructor(
    private sidenav: SidenavService
  ) { }

  ngOnInit() {
  }

}
