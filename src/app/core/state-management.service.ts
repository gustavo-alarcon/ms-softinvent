import { Injectable } from '@angular/core';
import { Ticket } from "./ms-types";
import { CurrencyIndex } from '@angular/common/src/i18n/locale_data';
import { MsTicket } from "../core/classes/ticket";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {

  currentStateIndex: number;

  currentState: Array<Ticket> = [
    {
      cart: [
        {
          name: 'Antare',
          stock: 4,
          quantity: 1,
          discountType: 'discount',
          discount: { amount: 100, percentage: 10 },
          salePrice: 1200.00,
          warehouse: "TDA 410"
        },
        {
          name: 'Pirandello',
          stock: 10,
          quantity: 1,
          discountType: 'discount',
          discount: { amount: 100, percentage: 10 },
          salePrice: 400.00,
          warehouse: "Fortaleza"
        }
      ], customer: 'Milagros, Palomino'
    },
    {
      cart: [
        {
          name: 'Aleman',
          stock: 2,
          quantity: 2,
          discountType: 'discount',
          discount: { amount: 100, percentage: 10 },
          salePrice: 1300.00,
          warehouse: "TDA 410"
        },
        {
          name: 'Sigma',
          stock: 10,
          quantity: 10,
          discountType: 'discount',
          discount: { amount: 100, percentage: 10 },
          salePrice: 600.00,
          warehouse: "Fortaleza"
        },
      ], customer: 'Gabriela, Nuñez'
    }
  ];

  public stateManagement = new BehaviorSubject(this.currentState);
  public ticketsStateManagement = this.stateManagement.asObservable();

  constructor() { }

  agregarProducto(producto) {
    this.ticketsStateManagement[this.currentStateIndex].cart.push(producto);
    console.log(this.currentState);
    this.agregarTicket('asd');
  }
  eliminarProducto(producto){
    this.ticketsStateManagement[this.currentStateIndex].cart.splice(this.ticketsStateManagement[this.currentStateIndex].cart.indexOf(producto),1);
  }
  agregarTicket(ticket){
    this.ticketsStateManagement.push(ticket);

  public agregarTicket(asd) {
    let newTicket: Ticket;
    this.currentState.push(newTicket);
    this.stateManagement.next(this.currentState);
    console.log(this.currentState);
  }
  eliminarTicket(index){
    this.ticketsStateManagement.splice ( index,1)
  }
}
