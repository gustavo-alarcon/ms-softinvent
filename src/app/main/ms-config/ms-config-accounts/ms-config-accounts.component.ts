import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/core/sidenav.service';

@Component({
  selector: 'app-ms-config-accounts',
  templateUrl: './ms-config-accounts.component.html'
})

export class MsConfigAccountsComponent implements OnInit {

  constructor(private sideMenu: SidenavService) { }
  ngOnInit() {
  }
}
