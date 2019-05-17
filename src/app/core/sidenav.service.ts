import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  
  public sidenavAccountsToggle: boolean = true;

  public lastLinkAccounts: string = 'list';
  public lastLinkNotification: string = 'administrator';
  public sidenavNotificationsToggle: boolean = false;

  public sidenavTicketListToggle: boolean = false;
  public sidenavProductListToggle: boolean = false;
  
  constructor() { }

  // return boolean because use it to activate the sidenav
  sidenavAll(): boolean {
    this.sidenavAccountsToggle = !this.sidenavAccountsToggle;
    this.sidenavNotificationsToggle = !this.sidenavNotificationsToggle;
    return (true);
  }
  /** Toggle to Sidenav Accounts */
  sidenavUsuarios(): boolean {
    this.sidenavAccountsToggle = !this.sidenavAccountsToggle;
    return (this.sidenavAccountsToggle);
  }
  /** Toggle to Sidenav Notifications */
  sidenavNotificaciones(): boolean {
    this.sidenavNotificationsToggle = !this.sidenavNotificationsToggle;
    return (this.sidenavNotificationsToggle);
  }
  /** Save Account route */
  saveLinkAccount(route) {
    this.lastLinkAccounts = route;
  }
  
  /** Save Notification route */
  saveLinkNotification(route) {
    this.lastLinkNotification = route;
  }
  /** Get the last route with the parameter root
   * root {stirng} : Root name of the Nav Tab
   */
  getlastLink(root): string {
    if (root == 'Cuentas') {
      return this.lastLinkAccounts;
    }
    if (root == 'Notificaciones') {
      return this.lastLinkNotification;
    }
  }

  /**
   * @desc This functions toggles the sidenav ticket list menu in ticket section, step one
   * @return { boolean } Returns the toggled state of sidenavTicketListToggle
   */
  sidenavTicketList(): boolean {
    this.sidenavTicketListToggle = !this.sidenavTicketListToggle;
    return (this.sidenavTicketListToggle);
  }

  /**
   * @desc This functions toggles the sidenav product list menu in ticket section, step one
   * @return { boolean } Returns the toggled state of sidenavProductListToggle
   */
  sidenavProductList(): boolean {
    this.sidenavProductListToggle = !this.sidenavProductListToggle;
    return (this.sidenavProductListToggle);
  }

}