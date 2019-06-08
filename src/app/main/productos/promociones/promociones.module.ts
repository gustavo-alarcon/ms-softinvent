import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromocionesRoutingModule } from './promociones-routing.module';
import { PromocionesComponent } from './promociones.component';
import {  MatIconModule,
          MatFormFieldModule,
          MatInputModule,
          MatButtonModule,
          MatDividerModule,
          MatCheckboxModule,
          MatTooltipModule,
          MatMenuModule,
          MatTableModule,
          MatSortModule,
          MatToolbarModule,
          MatRippleModule,
          MatDialogModule,
          MatSelectModule,
          MatSlideToggleModule,
          MatPaginatorModule,
          MatAutocompleteModule,
          MatProgressBarModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CrearPromocionComponent } from './crear-promocion/crear-promocion.component';
import { EditarPromocionComponent } from './editar-promocion/editar-promocion.component';
import { ConfirmarEditarPromocionComponent } from './confirmar-editar-promocion/confirmar-editar-promocion.component';

@NgModule({
  declarations: [
    PromocionesComponent,
    CrearPromocionComponent,
    EditarPromocionComponent,
    ConfirmarEditarPromocionComponent],
  imports: [
    CommonModule,
    PromocionesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRippleModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatProgressBarModule
  ],
  entryComponents: [
    CrearPromocionComponent,
    EditarPromocionComponent,
    ConfirmarEditarPromocionComponent
  ]
})
export class PromocionesModule { }
