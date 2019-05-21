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
          warehouse: "TDA 410",
          sale : 1300.00
        },
        {
          name: 'Pirandello',
          stock: 10,
          quantity: 1,
          discountType: 'discount',
          discount: { amount: 100, percentage: 10 },
          salePrice: 400.00,
          warehouse: "Fortaleza",
          sale : 500.00
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
          warehouse: "TDA 410",
          sale : 2800.00
        },
        {
          name: 'Sigma',
          stock: 10,
          quantity: 10,
          discountType: 'discount',
          discount: { amount: 100, percentage: 10 },
          salePrice: 600.00,
          warehouse: "Fortaleza",
          sale : 7000.00
        },
      ], customer: 'Gabriela, Nuñez'
    }
  ];

  public stateManagement = new BehaviorSubject(this.currentState);
  public ticketsStateManagement = this.stateManagement.asObservable();

  constructor() { }


  agregarProducto(producto) {

    this.currentState[this.currentStateIndex].cart.push(producto);
    this.stateManagement.next(this.currentState);
    // console.log(this.currentState);
    //  this.agregarTicket('asd');
  }
  eliminarProducto(producto) {
    this.currentState[this.currentStateIndex].cart.splice(this.currentState[this.currentStateIndex].cart.indexOf(producto), 1);
    this.stateManagement.next(this.currentState);

  }

  public agregarTicket(ticket) {
    //let newTicket: Ticket;
    this.currentState.push(ticket);
    this.stateManagement.next(this.currentState);
    console.log(this.currentState);
  }

  eliminarTicket(index) {
    console.log("Si entra acas ")
    this.currentState.splice(index, 1);
    this.stateManagement.next(this.currentState);
  }
}
