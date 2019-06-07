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
          MatSlideToggleModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CrearPromocionComponent } from './crear-promocion/crear-promocion.component';

@NgModule({
  declarations: [
    PromocionesComponent,
    CrearPromocionComponent],
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
    MatSortModule,
    MatRippleModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  entryComponents: [
    CrearPromocionComponent
  ]
})
export class PromocionesModule { }
