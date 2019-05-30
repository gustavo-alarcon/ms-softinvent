import { Injectable } from '@angular/core';
import { Ticket, ProductCart } from "./ms-types";
import { CurrencyIndex } from '@angular/common/src/i18n/locale_data';
import { BehaviorSubject } from 'rxjs';
import { RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {

  public currentStateIndex: number;
  public currentState: Array<Ticket> = [
    {
      state: true,
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
      state: false,
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

  /*
  * @desc  add a new product in the current ticket 
  * @param {!product[]} actual product
  * @return { void } : Without returns
  */
  public addProduct(producto) {
    this.currentState[this.currentStateIndex].cart.push(producto);
    this.stateManagement.next(this.currentState);
  }
  /*
  * @desc  delete a product in the current ticket 
  * @param {!product[]} actual product
  * @return { void } : Without returns
  */
  public deleteProduct(index: number) {
    this.currentState[this.currentStateIndex].cart.splice(index, 1);
    this.stateManagement.next(this.currentState);
  }
  /*
  * @desc  add a new ticket after the last ticket
  * @return { void } : Without returns
  */
  public addTicket() {
    let productList: Array<ProductCart> = [];
    let ticket: Ticket = { state: false, cart: productList };
    this.currentState.push(ticket);
    this.currentStateIndex = this.currentState.length - 1;
    this.stateManagement.next(this.currentState);
    this.changeTicket()
  }
  /*
  * @desc  delete the current ticket 
  * @param {!Number[]} index: actual index of the ticket
  * @return { void } : Without returns
  */
  public deleteTicket(index: number) {
    console.log("A versh ... ", index);
    if (this.currentState.length) {
      this.currentState.splice(index, 1);
      this.currentStateIndex = this.currentState.length - 1;
      this.stateManagement.next(this.currentState);
      this.changeTicket()
    }
    else {
      this.currentState[this.currentStateIndex].cart.splice(0, this.currentState[0].cart.length);
      this.stateManagement.next(this.currentState);
      this.currentState.splice(index, 1);
      this.stateManagement.next(this.currentState);
    }
  }
  /*
  * @desc  add the price of all the products in the cart
  * @return { void } : Without returns
  */
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
  /*
  * @desc  replace the product with the new product in the current ticket 
  * @param {!newProduct[]}
  * @return { void } : Without returns
  */
  public editProduct(newProduct): void {
    this.currentState[this.currentStateIndex].cart.forEach((product, index) => {
      if (product.index === newProduct.index) {
        this.currentState[this.currentStateIndex].cart[index] = newProduct;
        this.stateManagement.next(this.currentState);
      }
    });
  }
  /*
  * @desc  change the states of the tickets, push false in all the tickets and push true in the current ticket
  * @return { void } : Without returns
  */
  public changeTicket(): void {
    this.currentState.forEach(current => {
      current.state = false;
    });
    if (this.currentState.length) {
      this.currentState[this.currentStateIndex].state = true;
      this.stateManagement.next(this.currentState);
    }
  }

}
