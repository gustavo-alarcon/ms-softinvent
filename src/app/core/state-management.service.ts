import { Injectable } from '@angular/core';
import { Ticket } from "./ms-types";

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {
  
  currentStateIndex: number;
  ticketsStateManagement: Array<Ticket> = [
    {
      cart: [
        {
          name: 'Antare',
          stock: 4,
          quantity: 1,
          discountType: 'discount',
          discount: {amount: 100, percentage: 10},
          salePrice: 1200.00,
          warehouse: "TDA 410"
        },
        {
          name: 'Pirandello',
          stock: 10,
          quantity: 1,
          discountType: 'discount',
          discount: {amount: 100, percentage: 10},
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
          discount: {amount: 100, percentage: 10},
          salePrice: 1300.00,
          warehouse: "TDA 410"
        },
        {
          name: 'Sigma',
          stock: 10,
          quantity: 10,
          discountType: 'discount',
          discount: {amount: 100, percentage: 10},
          salePrice: 600.00,
          warehouse: "Fortaleza"
        },
      ], customer: 'Gabriela, Nuñez'
    }
  ];

  constructor() { }
}
