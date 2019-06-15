import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-ms-toolbar',
  templateUrl: './ms-toolbar.component.html',
  styles: []
})
export class MsToolbarComponent implements OnInit {

  /*
  This decorator adds an EventEmitter, so the ms-sidenavmenu could toggle between open and close
  */
  @Output() toggle: EventEmitter<null> = new EventEmitter();

  constructor(
    public auth: AuthService,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  /**
   * @desc This function just emit an event using the toggle Output to activate the toggle menu
   * @type {void} Nothing is returned
   */
  toggleSideMenu(): void {
    this.toggle.emit();
  }

}
