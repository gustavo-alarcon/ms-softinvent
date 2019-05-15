import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/core/sidenav.service';

@Component({
  selector: 'app-ms-sidenav-config-accounts',
  templateUrl: './ms-sidenav-config-accounts.component.html',
})
export class MsSidenavConfigAccountsComponent implements OnInit {
  constructor(public sidenav: SidenavService) {
    sidenav.sidenavAccountsToggle = true;
  }
  ngOnInit() {
  }
}
