import { Component, OnInit } from '@angular/core';
import { Ticket, Product, ProductCart } from '../../core/ms-types';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/core/sidenav.service';
import { StateManagementService } from 'src/app/core/state-management.service';
import { MattabService } from 'src/app/core/mattab.service';
import { DataSource } from '@angular/cdk/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ms-sidenav-tickets-products',
  templateUrl: './ms-sidenav-tickets-products.component.html',
  styles: []
})
export class MsSidenavTicketsProductsComponent implements OnInit {

  sidenavTickets: boolean = true;
  currentTicket: Ticket;
  currentCart: ProductCart;
  constructor(
    private sidenav: SidenavService,
    private state: StateManagementService,
    private mat: MattabService
  ) {
    this.changeCurrentTicket(0);
  }
  subscriptions: Array<Subscription> = [];
  ngOnInit() {
    let temp = this.state.ticketsStateManagement.subscribe(res => {
      this.state.currentState = res;
      this.currentTicket = this.state.currentState[this.state.currentStateIndex];
      //this.currentCart = res[this.state.currentStateIndex].cart;
    })
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }
  changeCurrentTicket(index): void {
    this.currentTicket = this.state.currentState[index];
    this.state.currentStateIndex = index;
    this.calcTotalSalePrice();
  }
  /**
    * @desc  Cancula el preecio total del ticket
    * @return { void } : Sin retornos
    */
  calcTotalSalePrice(): void {
    let _total = 0;
    let _discount = 0;
    this.currentTicket.cart.forEach(prod => {
      _discount += prod.discount.amount * prod.quantity;
      _total += prod.salePrice;
    })
    this.currentTicket.totalWithoutDiscount = _total;
    this.currentTicket.totalDiscount = _discount;
    this.currentTicket.totalWithDiscount = _total - _discount;
  }
  /**
  * @desc  agrega un nuevo ticket 
  * @param {!Number[]} index  :indice del nuevo ticker a crear
  * @return { void } : Sin retornos
  */
  addTicket(index): void {
    let productList: Array<ProductCart> = [];
    let ticket: Ticket = { cart: productList };
    this.state.agregarTicket(ticket);
    this.state.currentStateIndex = index;
    this.currentTicket = this.state.ticketsStateManagement[index];
  }
  /**
  * @desc  elimina a un ticker de la lista de tickets
  * @param {!Number[]} index indice del ticket a eliminar
  * @return { void } : Sin retornos
  */
  deleteTicket(index): void {
    if (this.state.currentState.length != 1) {
      this.state.eliminarTicket(index);
      this.calcTotalSalePrice();
    }
  }
  /**
 * @desc  elimina a un producto del carrito
 * @param {!producto[]} product producto actual
 * @return { void } : Sin retornos
 */
  deleteProduct(product): void {
    this.state.eliminarProducto(product);
    this.calcTotalSalePrice();
  }
  /**
  * @desc  cambia al siguiente step
  * @return { void } : Sin retornos
  */
  nextStep(): void {
    this.mat.currentTab = "step-two";
  }
}
