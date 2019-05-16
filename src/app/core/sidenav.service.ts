import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  public sidenavNotificationToggle: boolean = false;

  public temp: string = 'Usuarios';
  constructor() { }
 /**
  *  return boolean because use it to activate the sidenav
  *  Toggle to Sidenav System */
 sidenavNotification(): boolean {
    this.sidenavNotificationToggle = !this.sidenavNotificationToggle;
    return (this.sidenavNotificationToggle);
  }

}
