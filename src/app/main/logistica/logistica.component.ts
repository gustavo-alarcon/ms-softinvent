import { Link } from '../../core/ms-types';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logistica',
  templateUrl: './logistica.component.html',
  styles: []
})
export class LogisticaComponent implements OnInit {

  links: Array<Link> = [
    { name: 'Recepción', icon: '', route: 'reception-list' },
    { name: 'Traslados', icon: '', route: 'transfer-list' }
  ];
  activeLink: Link = this.links[0];

  constructor(public router: Router) { }

  ngOnInit() {
    switch (this.router.url) {
      case '/logistica/reception-list':
        this.activeLink = this.links[0];
        break;

      case '/logistica/transfer-list':
        this.activeLink = this.links[1];
        break;

      default:
        this.activeLink = this.links[0];
        break;
    }
  }

}
