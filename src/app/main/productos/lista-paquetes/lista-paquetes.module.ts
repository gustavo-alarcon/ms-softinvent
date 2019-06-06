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
@NgModule({
  declarations: [
    ListaPaquetesComponent,
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
  ]
})
export class ListaPaquetesModule { }
