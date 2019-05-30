import { AuthService } from './../../../../../core/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ms-users',
  templateUrl: './ms-users.component.html',
  styles: []
})
export class MsUsersComponent implements OnInit {

  constructor(
    public auth: AuthService
  ) {}

  ngOnInit() {
  }

  filterData(event): void {
    
  }
}
