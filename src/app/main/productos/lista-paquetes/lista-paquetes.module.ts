import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPaquetesRoutingModule } from './lista-paquetes-routing.module';
import { ListaPaquetesComponent } from './lista-paquetes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatTooltipModule,
  MatDividerModule,
  MatSelectModule,
  MatToolbarModule,
  MatDialogModule,
  MatMenuModule
} from '@angular/material';
import { PackageDetailsComponent} from './package-details/package_details.component';
 import { CrearPaqueteComponent } from './crear-paquete/crear-paquete.component';
import { EditarPaqueteComponent } from './editar-paquete/editar-paquete.component';
import { ConfirmarBorrarPaqueteComponent } from './confirmar-borrar-paquete/confirmar-borrar-paquete.component';
import { ConfirmarEditarPaqueteComponent } from './confirmar-editar-paquete/confirmar-editar-paquete.component'
@NgModule({
  declarations: [
    ListaPaquetesComponent,
    PackageDetailsComponent,
    CrearPaqueteComponent,
    EditarPaqueteComponent,
    ConfirmarBorrarPaqueteComponent,
    ConfirmarEditarPaqueteComponent
  ],
  imports: [
    CommonModule,
    ListaPaquetesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDialogModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  entryComponents: [
    PackageDetailsComponent,
    CrearPaqueteComponent,
    EditarPaqueteComponent,
    ConfirmarBorrarPaqueteComponent,
    ConfirmarEditarPaqueteComponent
  ]
})
export class ListaPaquetesModule { }
