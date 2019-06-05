import { Link } from './../../core/ms-types';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductComponent implements OnInit {

  links: Array<Link> = [
    { name: 'Productos', icon: 'shopping_basket', route: 'product-list' },
    { name: 'Paquetes', icon: 'assignment', route: 'package-list' },
    { name: 'Promociones', icon: 'card_giftcard', route: 'promos' }
  ];
  activeLink: Link = this.links[0];
  constructor(public router: Router) { }

  ngOnInit() {
     switch (this.router.url) {
      case '/product/product-list':
        this.activeLink = this.links[0];
        break;

      case '/product/package-list':
        this.activeLink = this.links[1];
        break;

      case '/product/promos':
        this.activeLink = this.links[2];
        break;

      default:
        this.activeLink = this.links[0];
        break;
    }
  }

}
