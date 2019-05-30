import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

import { WarehousesComponent } from './almacenes/almacenes.component';
import { CreateWarehouseComponent } from './almacenes/crear-almacen/crear-almacen.component';
import { EditWarehouseComponent } from './almacenes/editar-almacen/editar-almacen.component';
import { InfoWarehouseComponent } from './almacenes/info-almacen/info-almacen.component';
import { ConfirmDeleteWarehouseComponent } from './almacenes/confirmar-borrar-almacen/confirmar-borrar-almacen.component';

import { PartiesComponent } from './terceros/terceros.component';
import { CreatePartyComponent } from './terceros/crear-tercero/crear-tercero.component';
import { EditPartyComponent } from './terceros/editar-tercero/editar-tercero.component';
import { InfoPartyComponent } from './terceros/info-tercero/info-tercero.component';
import { ConfirmDeletePartyComponent } from './terceros/confirmar-borrar-tercero/confirmar-borrar-tercero.component';

import { DocsComponent } from './documentos/documentos.component';
import { CreateDocComponent } from './documentos/crear-documento/crear-documento.component';
import { EditDocComponent } from './documentos/editar-documento/editar-documento.component';
import { ConfirmDeleteDocComponent } from './documentos/confirmar-borrar-documento/confirmar-borrar-documento.component';

import { ProductComponent } from './productos/productos.component';
import { CreateProductComponent } from './productos/crear-producto/crear-producto.component';
import { EditProductComponent } from './productos/editar-producto/editar-producto.component';
import { ConfirmDeleteProductComponent } from './productos/confirmar-borrar-producto/confirmar-borrar-producto.component';

import { RegisterComponent } from './registrar/registrar.component';
import { ConfirmClearRegisterComponent } from './registrar/confirmar-limpiar-registrar/confirmar-limpiar-registrar.component';
import { ConfirmSaveRegisterComponent } from './registrar/confirmar-grabar-registrar/confirmar-grabar-registrar.component';

import { KardexComponent } from './kardex/kardex.component';
import { StockComponent } from './stock/stock.component';

import { HistorialComponent } from './historial/historial.component';
import { ConfirmCancelComponent } from './historial/confirmar-anular/confirmar-anular.component';
import { ExitDetailsComponent } from './historial/detalles-salida/detalles-salida.component';
import { TransferDetailsComponent } from './historial/detalles-transferencia/detalles-transferencia.component';
import { EntryDetailsComponent } from './historial/detalles-entrada/detalles-entrada.component';
import { DetailsForEntryComponent } from './historial/detalles-aentrada/detalles-aentrada.component';
import { DetailsForExitComponent } from './historial/detalles-asalida/detalles-asalida.component';
import { ExtenderCorrelativoComponent } from './documentos/extender-correlativo/extender-correlativo.component';
import { MsToolbarComponent } from './main/ms-toolbar/ms-toolbar.component';
import { MsSidenavMenuComponent } from './main/ms-sidenav-menu/ms-sidenav-menu.component';
import { MsTicketComponent } from './ms-ticket/ms-ticket.component';
import { MsTicketStepperComponent } from './ms-ticket/ms-ticket-stepper/ms-ticket-stepper.component';
import { MsSidenavTicketsProductsComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-sidenav-tickets-products.component';
import { MsTicketStepOneComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-one/ms-ticket-step-one.component';
import { MsTicketStepTwoComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-two/ms-ticket-step-two.component';

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

import { EditTicketComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-two/editar-ticket/editar-ticket.component';
import { ConfirmProductComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-one/confirmacion-product/confirmacion-product.component';
import { ConfirmEditComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-two/confirmacion-edit/confirmacion-edit.component';

import { MsSalesComponent } from './ventas/ms-ventas.component';
import { MsVentasStepperComponent } from './ventas/ms-ventas-stepper/ms-ventas-stepper.component';
import { MsSalesStepOneComponent } from './ventas/ms-ventas-stepper/ms-ventas-step-one/ms-ventas-step-one.component';
import { MsSalesStepTwoComponent } from './ventas/ms-ventas-stepper/ms-ventas-step-two/ms-ventas-step-two.component';
import { MsSalesStepThreeComponent } from './ventas/ms-ventas-stepper/ms-ventas-step-three/ms-ventas-step-three.component';

import { MsSalesProductSearchComponent } from './ventas/ms-ventas-stepper/ms-ventas-step-one/ms-ventas-product-search/ms-ventas-product-search.component';
import { GenerateTicketComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-two/generar-ticket/generar-ticket.component';

// FIREBASE
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
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
import { NoStockComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-two/no-stock/no-stock.component';
import { ConfirmDeleteComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-two/confirmacion-delete/confirmacion-delete.component';
import { ConfirmDeleteTicketComponent } from './ms-ticket/ms-sidenav-tickets-products/confirmacion-delete-ticket/confirmacion-delete-ticket.component';
import { EditStockComponent } from './ms-ticket/ms-sidenav-tickets-products/ms-ticket-step-two/edit-stock/edit-stock.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    MainComponent,
    WarehousesComponent,
    PartiesComponent,
    DocsComponent,
    ProductComponent,
    RegisterComponent,
    KardexComponent,
    StockComponent,
    HistorialComponent,
    CreateWarehouseComponent,
    EditWarehouseComponent,
    InfoWarehouseComponent,
    ConfirmDeleteWarehouseComponent,
    CreatePartyComponent,
    EditPartyComponent,
    InfoPartyComponent,
    ConfirmDeletePartyComponent,
    CreateDocComponent,
    EditDocComponent,
    ConfirmDeleteDocComponent,
    CreateProductComponent,
    EditProductComponent,
    ConfirmDeleteProductComponent,
    ConfirmClearRegisterComponent,
    ConfirmSaveRegisterComponent,
    CorrelativePipe,
    ExtenderCorrelativoComponent,
    ConfirmCancelComponent,
    ExitDetailsComponent,
    TransferDetailsComponent,
    EntryDetailsComponent,
    DetailsForEntryComponent,
    DetailsForExitComponent,
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
    EditTicketComponent,
    ConfirmProductComponent,
    ConfirmEditComponent,
    MsSalesStepOneComponent,
    MsSalesStepTwoComponent,
    MsSalesStepThreeComponent,
    MsSalesComponent,
    MsSalesProductSearchComponent,
    GenerateTicketComponent,
    NoStockComponent,
    ConfirmDeleteComponent,
    ConfirmDeleteTicketComponent,
    EditStockComponent,
    MsSidenavNotificationsComponent
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
    CreateWarehouseComponent,
    EditWarehouseComponent,
    InfoWarehouseComponent,
    ConfirmDeleteWarehouseComponent,
    CreatePartyComponent,
    EditPartyComponent,
    InfoPartyComponent,
    ConfirmDeletePartyComponent,
    CreateDocComponent,
    EditDocComponent,
    ConfirmDeleteDocComponent,
    CreateProductComponent,
    EditProductComponent,
    ConfirmDeleteProductComponent,
    ConfirmClearRegisterComponent,
    ConfirmSaveRegisterComponent,
    ConfirmCancelComponent,
    ExitDetailsComponent,
    DetailsForExitComponent,
    DetailsForEntryComponent,
    TransferDetailsComponent,
    EntryDetailsComponent,
    MsTicketDialogProductDescriptionComponent,
    MsTicketDialogProductMovementComponent,
    EditTicketComponent,
    ConfirmProductComponent,
    ConfirmEditComponent,
    GenerateTicketComponent,
    NoStockComponent,
    ConfirmDeleteComponent,
    ConfirmDeleteTicketComponent,
    EditStockComponent
  ],
  providers: [
    AuthService,
    SidenavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
