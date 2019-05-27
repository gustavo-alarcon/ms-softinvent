import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/core/sidenav.service';
@Component({
  selector: 'app-ms-config',
  templateUrl: './ms-config.component.html',
  styles: []
})
export class MsConfigComponent implements OnInit {
  links = [
    { name: 'Cuentas', route: 'config-accounts' },
    { name: 'Notificaciones', route: 'config-notifications' }
  ];
  activeLink = this.links[0];
  constructor(public router: Router, public sidenav: SidenavService) { }

  ngOnInit() {
  }

}


/*
Author: Gabriela
Date start: 14/05/2019
Date finish: 14/05/2019
*/