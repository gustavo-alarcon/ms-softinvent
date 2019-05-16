import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  
  public sidenavAccountsToggle: boolean = true;
  public sidenavNotificationsToggle: boolean = true;
  public lastLinkAccounts: string = 'list';
  public lastLinkNotification: string = 'administrator';
  
  constructor() { }

  *  return boolean because use it to activate the sidenav
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

}
