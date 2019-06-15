import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrasladosRoutingModule } from './traslados-routing.module';
import { TrasladosComponent } from './traslados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatIconModule,
          MatFormFieldModule,
          MatInputModule,
          MatDatepickerModule,
          MatNativeDateModule,
          MatButtonModule,
          MatCheckboxModule,
          MatDividerModule} from '@angular/material';
import { CrearTrasladoComponent } from './crear-traslado/crear-traslado.component';

@NgModule({
  declarations: [
    TrasladosComponent,
    CrearTrasladoComponent
  ],
  imports: [
    CommonModule,
    TrasladosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatAutocompleteModule

  ], 
  entryComponents : [
    CrearTrasladoComponent
  ]
})
export class TrasladosModule { }
