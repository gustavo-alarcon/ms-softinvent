import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {

  opened: boolean = false;

  constructor(
    public auth: AuthService,
    public snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  openSidenav(): void {
    this.opened = !this.opened;
  }

}
