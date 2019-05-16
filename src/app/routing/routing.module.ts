import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from "../core/auth.guard";
import { WelcomeComponent } from '../welcome/welcome.component';
import { LoginComponent } from '../login/login.component';
import { MainComponent } from '../main/main.component';
import { AlmacenesComponent } from '../almacenes/almacenes.component';
import { TercerosComponent } from '../terceros/terceros.component';
import { DocumentosComponent } from '../documentos/documentos.component';
import { ProductosComponent } from '../productos/productos.component';
import { RegistrarComponent } from '../registrar/registrar.component';
import { StockComponent } from '../stock/stock.component';
import { KardexComponent } from '../kardex/kardex.component';
import { HistorialComponent } from '../historial/historial.component';
import { MsTicketProductSearchComponent } from '../ms-ticket/ms-ticket-stepper/ms-ticket-product-search/ms-ticket-product-search.component';
import { MsSidenavNotificationsComponent } from '../ms-sidenav-notifications/ms-sidenav-notifications.component';
import { MsConfigComponent } from '../main/ms-config/ms-config.component';
import { MsConfigAccountsComponent } from '../main/ms-config/ms-config-accounts/ms-config-accounts.component';
import { MsConfigNotificationsComponent } from '../main/ms-config/ms-config-notifications/ms-config-notifications.component';
import { MsUsersComponent } from '../main/ms-config/ms-config-accounts/ms-sidenav-config-accounts/ms-users/ms-users.component';
import { MsPermitsComponent } from '../main/ms-config/ms-config-accounts/ms-sidenav-config-accounts/ms-permits/ms-permits.component';
import { MsConfigAdminComponent } from '../main/ms-config/ms-config-notifications/ms-sidenav-config-notifications/ms-config-admin/ms-config-admin.component';
import { MsConfigStaffComponent } from '../main/ms-config/ms-config-notifications/ms-sidenav-config-notifications/ms-config-staff/ms-config-staff.component';
import { MsTicket2ProductSearchComponent } from '../ms-ticket2/ms-ticker2-stepper/ms-ticket2-product-search/ms-ticket2-product-search.component';

const routes: Routes = [
  {
    path: 'welcome', component: WelcomeComponent,
    children: [
      {
        path: '', component: LoginComponent
      }
    ]
  },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard],
    children: [

      {
        path: 'ms-config', component: MsConfigComponent,
        children: [
          {
            path: 'config-accounts', component: MsConfigAccountsComponent,
            children: [
              {
                path: 'list', component: MsUsersComponent
              },
              {
                path: 'permits', component: MsPermitsComponent
              }
            ]
          },
          {
            path: 'config-notifications', component: MsConfigNotificationsComponent,
            children: [
              {
                path: 'administrator', component: MsConfigAdminComponent
              },
              {
                path: 'staff', component: MsConfigStaffComponent
              }
            ]
          },
        ]
      },
      {
        path: 'almacenes', component: AlmacenesComponent
      },
      {
        path: 'terceros', component: TercerosComponent
      },
      {
        path: 'documentos', component: DocumentosComponent
      },
      {
        path: 'productos', component: ProductosComponent
      },
      {
        path: 'registrar', component: RegistrarComponent
      },
      {
        path: 'kardex', component: MsTicketProductSearchComponent
      },
      {
        path: 'stock', component: StockComponent
      },
      {
        path: 'historial', component: HistorialComponent
      },
      {
        path: 'dashboard', component: MsTicket2ProductSearchComponent
      }

    ]
  },



  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', component: WelcomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    RouterModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
export class AppRoutingModule { }
