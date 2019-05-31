import { AuthService } from 'src/app/core/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { DatabaseService } from './database.service';
import { SidenavService } from './sidenav.service';
import { StateManagementService } from './state-management.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthService,
    AuthGuard,
    DatabaseService,
    SidenavService,
    StateManagementService
  ]
})
export class CoreModule { }
