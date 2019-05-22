import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';

// PIPES
import { CorrelativePipe } from './pipes/correlative.pipe';

// SERVICES
import { AuthService } from './core/auth.service';
import { environment } from 'src/environments/environment';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SidenavService } from './core/sidenav.service';

// COMPONENTS
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';

import { AlmacenesComponent } from './almacenes/almacenes.component';
import { CrearAlmacenComponent } from './almacenes/crear-almacen/crear-almacen.component';
import { EditarAlmacenComponent } from './almacenes/editar-almacen/editar-almacen.component';
import { InfoAlmacenComponent } from './almacenes/info-almacen/info-almacen.component';
import { ConfirmarBorrarAlmacenComponent } from './almacenes/confirmar-borrar-almacen/confirmar-borrar-almacen.component';

import { TercerosComponent } from './terceros/terceros.component';
import { CrearTerceroComponent } from './terceros/crear-tercero/crear-tercero.component';
import { EditarTerceroComponent } from './terceros/editar-tercero/editar-tercero.component';
import { InfoTerceroComponent } from './terceros/info-tercero/info-tercero.component';
import { ConfirmarBorrarTerceroComponent } from './terceros/confirmar-borrar-tercero/confirmar-borrar-tercero.component';

import { DocumentosComponent } from './documentos/documentos.component';
import { CrearDocumentoComponent } from './documentos/crear-documento/crear-documento.component';
import { EditarDocumentoComponent } from './documentos/editar-documento/editar-documento.component';
import { ConfirmarBorrarDocumentoComponent } from './documentos/confirmar-borrar-documento/confirmar-borrar-documento.component';

import { ProductosComponent } from './productos/productos.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { ConfirmarBorrarProductoComponent } from './productos/confirmar-borrar-producto/confirmar-borrar-producto.component';

import { RegistrarComponent } from './registrar/registrar.component';
import { ConfirmarLimpiarRegistrarComponent } from './registrar/confirmar-limpiar-registrar/confirmar-limpiar-registrar.component';
import { ConfirmarGrabarRegistrarComponent } from './registrar/confirmar-grabar-registrar/confirmar-grabar-registrar.component';

import { KardexComponent } from './kardex/kardex.component';
import { StockComponent } from './stock/stock.component';

import { HistorialComponent } from './historial/historial.component';
import { ConfirmarAnularComponent } from './historial/confirmar-anular/confirmar-anular.component';
import { DetallesSalidaComponent } from './historial/detalles-salida/detalles-salida.component';
import { DetallesTransferenciaComponent } from './historial/detalles-transferencia/detalles-transferencia.component';
import { DetallesEntradaComponent } from './historial/detalles-entrada/detalles-entrada.component';
import { DetallesAentradaComponent } from './historial/detalles-aentrada/detalles-aentrada.component';
import { DetallesAsalidaComponent } from './historial/detalles-asalida/detalles-asalida.component';
import { ExtenderCorrelativoComponent } from './documentos/extender-correlativo/extender-correlativo.component';
import { MsToolbarComponent } from './main/ms-toolbar/ms-toolbar.component';
import { MsSidenavMenuComponent } from './main/ms-sidenav-menu/ms-sidenav-menu.component';
import { MsTicketComponent } from './ms-ticket/ms-ticket.component';
import { MsTicketStepperComponent } from './ms-ticket/ms-ticket-stepper/ms-ticket-stepper.component';
import { MsSidenavTicketsProductsComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-sidenav-tickets-products.component';
import { MsTicketStepOneComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-one/ms-ticket-step-one.component';
import { MsTicketStepTwoComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-two/ms-ticket-step-two.component';
import { MsTicketStepThreeComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-three/ms-ticket-step-three.component';

import { MsTicketProductSearchComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-one/ms-ticket-product-search/ms-ticket-product-search.component';
import { MsTicketDialogProductDescriptionComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-one/ms-ticket-dialog-product-description/ms-ticket-dialog-product-description.component';
import { MsTicketDialogProductMovementComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-one/ms-ticket-dialog-product-movement/ms-ticket-dialog-product-movement.component';

import { MsConfigComponent } from './main/ms-config/ms-config.component';
import { MsConfigAccountsComponent } from './main/ms-config/ms-config-accounts/ms-config-accounts.component';
import { MsSidenavConfigAccountsComponent } from './main/ms-config/ms-config-accounts/ms-sidenav-config-accounts/ms-sidenav-config-accounts.component';
import { MsPermitsComponent } from './main/ms-config/ms-config-accounts/ms-sidenav-config-accounts/ms-permits/ms-permits.component';
import { MsUsersComponent } from './main/ms-config/ms-config-accounts/ms-sidenav-config-accounts/ms-users/ms-users.component';
import { MsConfigNotificationsComponent } from './main/ms-config/ms-config-notifications/ms-config-notifications.component';
import { MsSidenavConfigNotificationsComponent } from './main/ms-config/ms-config-notifications/ms-sidenav-config-notifications/ms-sidenav-config-notifications.component';
import { MsConfigAdminComponent } from './main/ms-config/ms-config-notifications/ms-sidenav-config-notifications/ms-config-admin/ms-config-admin.component';
import { MsConfigStaffComponent } from './main/ms-config/ms-config-notifications/ms-sidenav-config-notifications/ms-config-staff/ms-config-staff.component';
import { MsSidenavNotificationsComponent } from './ms-sidenav-notifications/ms-sidenav-notifications.component';

import { EditarTicketComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-two/editar-ticket/editar-ticket.component';
import { ConfirmacionProductComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-one/confirmacion-product/confirmacion-product.component';
import { ConfirmacionEditComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-two/confirmacion-edit/confirmacion-edit.component';

import { MsVentasComponent } from './ventas/ms-ventas.component';
import { MsVentasStepperComponent } from './ventas/ms-ventas-stepper/ms-ventas-stepper.component';
import { MsVentasStepOneComponent } from './ventas/ms-ventas-stepper/ms-ventas-step-one/ms-ventas-step-one.component';
import { MsVentasStepTwoComponent } from './ventas/ms-ventas-stepper/ms-ventas-step-two/ms-ventas-step-two.component';
import { MsVentasStepThreeComponent } from './ventas/ms-ventas-stepper/ms-ventas-step-three/ms-ventas-step-three.component';

import { MsVentasProductSearchComponent } from './ventas/ms-ventas-stepper/ms-ventas-step-one/ms-ventas-product-search/ms-ventas-product-search.component';

// FIREBASE
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from '@angular/fire/auth';

// MATERIAL DESIGN 7.1.0
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MainComponent } from './main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    MainComponent,
    AlmacenesComponent,
    TercerosComponent,
    DocumentosComponent,
    ProductosComponent,
    RegistrarComponent,
    KardexComponent,
    StockComponent,
    HistorialComponent,
    CrearAlmacenComponent,
    EditarAlmacenComponent,
    InfoAlmacenComponent,
    ConfirmarBorrarAlmacenComponent,
    CrearTerceroComponent,
    EditarTerceroComponent,
    InfoTerceroComponent,
    ConfirmarBorrarTerceroComponent,
    CrearDocumentoComponent,
    EditarDocumentoComponent,
    ConfirmarBorrarDocumentoComponent,
    CrearProductoComponent,
    EditarProductoComponent,
    ConfirmarBorrarProductoComponent,
    ConfirmarLimpiarRegistrarComponent,
    ConfirmarGrabarRegistrarComponent,
    CorrelativePipe,
    ExtenderCorrelativoComponent,
    ConfirmarAnularComponent,
    DetallesSalidaComponent,
    DetallesTransferenciaComponent,
    DetallesEntradaComponent,
    DetallesAentradaComponent,
    DetallesAsalidaComponent,
    MsConfigComponent,
    MsConfigAccountsComponent,
    MsSidenavConfigAccountsComponent,
    MsPermitsComponent,
    MsUsersComponent,
    MsConfigNotificationsComponent,
    MsSidenavConfigNotificationsComponent,
    MsConfigAdminComponent,
    MsConfigStaffComponent,
    MsTicketProductSearchComponent,
    MsTicketDialogProductDescriptionComponent,
    MsTicketDialogProductMovementComponent,
    MsToolbarComponent,
    MsSidenavMenuComponent,
    MsTicketComponent,
    MsVentasStepperComponent,
    MsTicketStepperComponent,
    MsSidenavTicketsProductsComponent,
    MsTicketStepOneComponent,
    MsTicketStepTwoComponent,
    MsTicketStepThreeComponent,
    EditarTicketComponent,
    ConfirmacionProductComponent,
    ConfirmacionEditComponent,
    MsVentasStepOneComponent,
    MsVentasStepTwoComponent,
    MsVentasStepThreeComponent,
    MsVentasComponent,
    MsVentasProductSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'softhotel'),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatRadioModule,
    MatCardModule,
    MatExpansionModule,
    MatCardModule
    

  ],
  entryComponents: [
    CrearAlmacenComponent,
    EditarAlmacenComponent,
    InfoAlmacenComponent,
    ConfirmarBorrarAlmacenComponent,
    CrearTerceroComponent,
    EditarTerceroComponent,
    InfoTerceroComponent,
    ConfirmarBorrarTerceroComponent,
    CrearDocumentoComponent,
    EditarDocumentoComponent,
    ConfirmarBorrarDocumentoComponent,
    CrearProductoComponent,
    EditarProductoComponent,
    ConfirmarBorrarProductoComponent,
    ConfirmarLimpiarRegistrarComponent,
    ConfirmarGrabarRegistrarComponent,
    ConfirmarAnularComponent,
    DetallesSalidaComponent,
    DetallesAsalidaComponent,
    DetallesAentradaComponent,
    DetallesTransferenciaComponent,
    DetallesEntradaComponent,
    MsTicketDialogProductDescriptionComponent,
    MsTicketDialogProductMovementComponent,
    EditarTicketComponent,
    ConfirmacionProductComponent,
    ConfirmacionEditComponent
  ],
  providers: [
    AuthService,
    SidenavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
