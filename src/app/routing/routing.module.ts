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
import { MsTicketComponent } from '../ms-ticket/ms-ticket.component';
import { MsTicketStepOneComponent } from '../ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-one/ms-ticket-step-one.component';
import { MsTicketStepTwoComponent } from '../ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-two/ms-ticket-step-two.component';
import { MsTicketStepThreeComponent } from '../ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-three/ms-ticket-step-three.component';
import { MsConfigComponent } from '../main/ms-config/ms-config.component';
import { MsConfigAccountsComponent } from '../main/ms-config/ms-config-accounts/ms-config-accounts.component';
import { MsConfigNotificationsComponent } from '../main/ms-config/ms-config-notifications/ms-config-notifications.component';
import { MsUsersComponent } from '../main/ms-config/ms-config-accounts/ms-sidenav-config-accounts/ms-users/ms-users.component';
import { MsPermitsComponent } from '../main/ms-config/ms-config-accounts/ms-sidenav-config-accounts/ms-permits/ms-permits.component';
import { MsConfigAdminComponent } from '../main/ms-config/ms-config-notifications/ms-sidenav-config-notifications/ms-config-admin/ms-config-admin.component';
import { MsConfigStaffComponent } from '../main/ms-config/ms-config-notifications/ms-sidenav-config-notifications/ms-config-staff/ms-config-staff.component';
import { MsVentasComponent } from '../ventas/ms-ventas.component';
import { MsVentasStepOneComponent } from '../ventas/ms-ventas-stepper/ms-ventas-step-one/ms-ventas-step-one.component'
import { MsVentasStepTwoComponent } from '../ventas/ms-ventas-stepper/ms-ventas-step-two/ms-ventas-step-two.component'
import { MsVentasStepThreeComponent } from '../ventas/ms-ventas-stepper/ms-ventas-step-three/ms-ventas-step-three.component'



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
        path: 'config', component: MsConfigComponent,
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
        path: 'venta', component:MsVentasComponent ,
        children: [
          {
            path: '', component: MsTicketStepOneComponent
          },
          {
            path: 'step-one', component: MsVentasStepOneComponent
          },
          {
            path: 'step-two', component: MsVentasStepTwoComponent
          },
          {
            path: 'step-three', component: MsVentasStepThreeComponent
          }
        ]
      },
      {
        path: 'ticket', component: MsTicketComponent,
        children: [
          {
            path: '', component: MsTicketStepOneComponent
          },
          {
            path: 'step-one', component: MsTicketStepOneComponent
          },
          {
            path: 'step-two', component: MsTicketStepTwoComponent
          },
          {
            path: 'step-three', component: MsTicketStepThreeComponent
          }
        ]
      },
      {
        path: 'kardex', component: MsTicketComponent
      },
      {
        path: 'stock', component: StockComponent
      },
      {
        path: 'historial', component: HistorialComponent
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
