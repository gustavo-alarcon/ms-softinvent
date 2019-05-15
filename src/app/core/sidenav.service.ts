import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  public sidenavAccountsToggle: boolean = true;
  public lastLinkAccounts: string = 'list';
  public lastLinkNotification: string = 'administrator';
  public sidenavNotificationToggle: boolean = false;
  constructor() { }
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