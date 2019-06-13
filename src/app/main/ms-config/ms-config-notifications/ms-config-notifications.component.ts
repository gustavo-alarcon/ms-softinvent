import { Component, OnInit} from '@angular/core';
import { SidenavService } from 'src/app/core/sidenav.service';
@Component({
  selector: 'app-ms-config-notifications',
  templateUrl: './ms-config-notifications.component.html',
  styles: []
})
export class MsConfigNotificationsComponent implements OnInit {
  constructor(private sideMenu: SidenavService) { }
  ngOnInit() {
  }
}
