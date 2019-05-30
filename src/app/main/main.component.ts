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

  sideBarIsOpened = false;

  constructor() { }

  ngOnInit() {
  }

  toggleSideBar() {
    this.sideBarIsOpened = !this.sideBarIsOpened;
  }
}
