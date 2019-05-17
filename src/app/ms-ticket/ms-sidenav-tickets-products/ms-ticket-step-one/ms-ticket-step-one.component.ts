import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/core/sidenav.service';

@Component({
  selector: 'app-ms-ticket-step-one',
  templateUrl: './ms-ticket-step-one.component.html',
  styles: []
})
export class MsTicketStepOneComponent implements OnInit {

  constructor(
    private sidenav: SidenavService
  ) { }

  ngOnInit() {
  }

}
