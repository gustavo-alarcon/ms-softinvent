import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from "../../core/ms-types";
import { MattabService } from '../../core/mattab.service';

@Component({
  selector: 'app-ms-ticket-stepper',
  templateUrl: './ms-ticket-stepper.component.html',
  styles: []
})
export class MsTicketStepperComponent implements OnInit {

  links: Array<Link> = [
    { name: 'Productos', icon: 'shopping_basket', route: 'step-one' },
    { name: 'Información', icon: 'assignment', route: 'step-two' }
  ];
  activeLink: Link = this.links[0];
  constructor(
    private router: Router,
    public tab: MattabService
  ) {

    switch (this.router.url) {
      case '/main/ticket/step-one':
        this.activeLink = this.links[0];
        break;

      case '/main/ticket/step-two':
        this.activeLink = this.links[1];
        break;

      default:
        this.activeLink = this.links[0];
        break;
    }
  }

  ngOnInit() {
  }

}
