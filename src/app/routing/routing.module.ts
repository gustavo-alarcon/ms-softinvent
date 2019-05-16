import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from "../core/auth.guard";
import { RouterModule, Routes } from "@angular/router";
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
const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent,
    children: [
      {
        path: '', component: LoginComponent
      }
    ]
  },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '', component: AlmacenesComponent
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
      }
    ]
  },
  { path: '',   redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', component: WelcomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
