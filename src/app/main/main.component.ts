import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { MatSnackBar } from '@angular/material';
import { SidenavService } from 'src/app/core/sidenav.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {
  opened: boolean = false;
  openedNotification: boolean = false;
  constructor(
    public auth: AuthService,
    public snackbar: MatSnackBar,
    public sidenav: SidenavService,
  ) { }

  ngOnInit() {
  }
  openSidenav(): void {
    this.opened = !this.opened;
  }
}
