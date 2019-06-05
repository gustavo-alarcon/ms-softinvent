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
          MatTooltipModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PromocionesComponent],
  imports: [
    CommonModule,
    PromocionesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatTooltipModule
  ]
})
export class PromocionesModule { }
