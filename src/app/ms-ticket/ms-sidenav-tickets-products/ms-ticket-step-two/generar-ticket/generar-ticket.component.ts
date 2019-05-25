import { Component, OnInit } from '@angular/core';
import { Staff } from 'src/app/core/ms-types';
import { DatabaseService } from 'src/app/core/database.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-generar-ticket',
  templateUrl: './generar-ticket.component.html',
  styles: []
})
export class GenerarTicketComponent implements OnInit {
  code: string;

  constructor(
    public dbs: DatabaseService,
    public auth: AuthService,
  ) { }

  ngOnInit() {
    console.log('Staff Code:',this.auth.userInvent.code)
  }
}