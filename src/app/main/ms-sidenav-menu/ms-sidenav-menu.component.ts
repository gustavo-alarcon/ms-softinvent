import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-ms-sidenav-menu',
  templateUrl: './ms-sidenav-menu.component.html',
  styles: []
})
export class MsSidenavMenuComponent implements OnInit {

  /**
   * The Input decorator is used to receive the emit from <ms-toolbar>
   * @desc Variable used to toggle the sidemenu
   * @type {boolean}
   */
  @Input() openedMenu: boolean = false;

  constructor(
    public auth:AuthService,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  /**
   * @desc This function toggle the sidemenu between true and false
   * @type {void} nothing is returned
   */
  toggleSideMenu(): void {
    this.openedMenu = false;
  }

}
