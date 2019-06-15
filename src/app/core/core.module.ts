import { DatabaseService } from './database.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavService } from './sidenav.service';
import { StateManagementService } from './state-management.service';
import { CorrelativePipe } from '../pipes/correlative.pipe';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    DatabaseService,
    SidenavService,
    StateManagementService
  ]
})
export class CoreModule { }
