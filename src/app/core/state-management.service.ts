import { Injectable } from '@angular/core';
import { Ticket } from "./ms-types";
import { CurrencyIndex } from '@angular/common/src/i18n/locale_data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {

  public currentStateIndex: number;

  public currentState: Array<Ticket> = [
    {
      cart: [
        {
          index: 0,
          name: 'Antare',
          stock: 4,
          quantity: 1,
          discountType: 'discount',
          discount: { amount: 100, percentage: 10 },
          salePrice: 1200.00,
          warehouse: "TDA 410",
          sale: 1300.00
        },
        {
          index: 1,
          name: 'Pirandello',
          stock: 10,
          quantity: 1,
          discountType: 'discount',
          discount: { amount: 100, percentage: 10 },
          salePrice: 400.00,
          warehouse: "Fortaleza",
          sale: 500.00
        }
      ], customer: 'Milagros, Palomino'
      , totalDiscount: 200,
      totalWithoutDiscount: 1800,
      totalWithDiscount: 1600,
    },
    {
      cart: [
        {
          index: 0,
          name: 'Aleman',
          stock: 2,
          quantity: 2,
          discountType: 'discount',
          discount: { amount: 100, percentage: 10 },
          salePrice: 1300.00,
          warehouse: "TDA 410",
          sale: 2800.00
        },
        {
          index: 1,
          name: 'Sigma',
          stock: 10,
          quantity: 10,
          discountType: 'discount',
          discount: { amount: 100, percentage: 10 },
          salePrice: 600.00,
          warehouse: "Fortaleza",
          sale: 7000.00
        },
      ]
      , customer: 'Gabriela, Nuñez'
      , totalDiscount: 1200,
      totalWithoutDiscount: 8600,
      totalWithDiscount: 7400,
    }
  ];

  public stateManagement = new BehaviorSubject(this.currentState);
  public ticketsStateManagement = this.stateManagement.asObservable();

  constructor() { }


  public agregarProducto(producto) {
    this.currentState[this.currentStateIndex].cart.push(producto);
    this.stateManagement.next(this.currentState);
  }

  public eliminarProducto(producto) {
    this.currentState[this.currentStateIndex].cart.splice(this.currentState[this.currentStateIndex].cart.indexOf(producto), 1);
    this.stateManagement.next(this.currentState);

  }

  public agregarTicket(ticket) {
    this.currentState.push(ticket);
    this.stateManagement.next(this.currentState);
  }

  public eliminarTicket(index) {
    this.currentState.splice(index, 1);
    this.stateManagement.next(this.currentState);
  }
  public calcTotalSalePrice() {
    let _total = 0;
    let _discount = 0;
    if (this.currentState[this.currentStateIndex]) {
      this.currentState[this.currentStateIndex].cart.forEach(prod => {
        _discount += prod.discount.amount;
        _total += prod.salePrice;
      })
      this.currentState[this.currentStateIndex].totalWithoutDiscount = _total + _discount;
      this.currentState[this.currentStateIndex].totalDiscount = _discount;
      this.currentState[this.currentStateIndex].totalWithDiscount = _total;
    }
  }
  public editarProducto(newProduct): void {

    console.log(newProduct);
    console.log(this.currentState[this.currentStateIndex].cart);

    for (var _i = 0; _i < this.currentState.length; _i++) {

      if (this.currentState[this.currentStateIndex].cart[_i].index == newProduct.index) {
        this.currentState[this.currentStateIndex].cart.splice(this.currentState[this.currentStateIndex].cart.indexOf(this.currentState[this.currentStateIndex].cart[_i]), 1);
        this.stateManagement.next(this.currentState);
        this.currentState[this.currentStateIndex].cart.push(newProduct);
        this.stateManagement.next(this.currentState);
      }
    }
   

  }
}
