import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/core/sidenav.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-ms-sidenav-notifications',
  templateUrl: './ms-sidenav-notifications.component.html'
})
export class MsSidenavNotificationsComponent implements OnInit {
  openedNotifications: boolean = false;

  constructor(
    public sidenav: SidenavService,
    public auth: AuthService
    ) { }

  ngOnInit() {
  }
  toggleSideNotifications(): void{
    this.openedNotifications = !this.openedNotifications    
  }
}
