import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/core/sidenav.service';

@Component({
  selector: 'app-ms-sidenav-config-notifications',
  templateUrl: './ms-sidenav-config-notifications.component.html'
})

export class MsSidenavConfigNotificationsComponent implements OnInit {
  constructor(public sidenav: SidenavService) {
    sidenav.sidenavNotificationsToggle = true;
  }
  ngOnInit() {
  }

}
