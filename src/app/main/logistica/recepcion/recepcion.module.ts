import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecepcionRoutingModule } from './recepcion-routing.module';
import { RecepcionComponent } from './recepcion.component';
import {  MatIconModule,
          MatFormFieldModule,
          MatInputModule,
          MatDatepickerModule,
          MatNativeDateModule,
          MatButtonModule,
          MatCheckboxModule,
          MatDividerModule,
          MatTableModule,
          MatPaginatorModule,
          MatSortModule,
          MatToolbarModule,
          MatProgressBarModule,
          MatDialogModule} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmarRechazarRecepcionComponent } from './confirmar-rechazar-recepcion/confirmar-rechazar-recepcion.component';
import { CorrelativePipe } from 'src/app/pipes/correlative.pipe';

@NgModule({
  declarations: [
    RecepcionComponent,
    ConfirmarRechazarRecepcionComponent
  ],
  imports: [
    CommonModule,
    RecepcionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  entryComponents: [
    ConfirmarRechazarRecepcionComponent
  ]
})
export class RecepcionModule { }
