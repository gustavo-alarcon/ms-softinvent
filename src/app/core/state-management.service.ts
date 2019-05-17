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
          price: 1200.00,
          quantity: 1,
          discountType: 'discount',
          discount: {amount: 100, percentage: 10}
        },
        {
          name: 'Pirandello',
          stock: 10,
          price: 400.00,
          quantity: 1,
          discountType: 'discount',
          discount: {amount: 100, percentage: 10}
        },
        {
          name: 'Piscis',
          stock: 8,
          price: 800.00,
          quantity: 1,
          discountType: 'discount',
          discount: {amount: 100, percentage: 10}
        },
      ], customer: 'Milagros, Palomino'
    },
    {
      cart: [
        {
          name: 'Aleman',
          stock: 2,
          price: 1300.00,
          quantity: 2,
          discountType: 'discount',
          discount: {amount: 100, percentage: 10}
        },
        {
          name: 'Sigma',
          stock: 10,
          price: 500.00,
          quantity: 10,
          discountType: 'discount',
          discount: {amount: 100, percentage: 10}
        },
        {
          name: 'Tauro',
          stock: 8,
          price: 900.00,
          quantity: 8,
          discountType: 'discount',
          discount: {amount: 100, percentage: 10}
        },
      ], customer: 'Gabriela, Nuñez'
    },
    {
      cart: [
        {
          name: 'Classic',
          stock: 3,
          price: 1400.00,
          quantity: 3,
          discountType: 'discount',
          discount: {amount: 100, percentage: 10}
        },
        {
          name: 'Luna',
          stock: 8,
          price: 600.00,
          quantity: 8,
          discountType: 'discount',
          discount: {amount: 100, percentage: 10}
        },
        {
          name: 'Geminis',
          stock: 1,
          price: 1000.00,
          quantity: 1,
          discountType: 'discount',
          discount: {amount: 100, percentage: 10}
        },
      ], customer: 'Eduardo, Mollinedo'
    },
    {
      cart: [
        {
          name: 'Antare',
          stock: 10,
          price: 1500.00,
          quantity: 1,
          discountType: 'discount',
          discount: {amount: 100, percentage: 10}
        },
        {
          name: 'Pirandello',
          stock: 10,
          price: 700.00,
          quantity: 1,
          discountType: 'discount',
          discount: {amount: 100, percentage: 10}
        },
        {
          name: 'Piscis',
          stock: 10,
          price: 1100.00,
          quantity: 1,
          discountType: 'discount',
          discount: {amount: 100, percentage: 10}
        },
      ], customer: 'Gustavo, Alarcón'
    }
  ];

  constructor() { }
}
