import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaProductosRoutingModule } from './lista-productos-routing.module';
import { ListaProductosComponent } from './lista-productos.component';
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
  MatDialogModule,
  MatMenuModule
} from '@angular/material';
import { ConfirmDeleteProductComponent } from './confirmar-borrar-producto/confirmar-borrar-producto.component';
import { CreateProductComponent } from './crear-producto/crear-producto.component';
import { EditProductComponent } from './editar-producto/editar-producto.component';
import { MatStepperModule } from '@angular/material/stepper';


@NgModule({
  declarations: [
    ListaProductosComponent,
    ConfirmDeleteProductComponent,
    CreateProductComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    ListaProductosRoutingModule,
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
    MatStepperModule
  ],
  entryComponents: [
    ConfirmDeleteProductComponent,
    CreateProductComponent,
    EditProductComponent
  ]
})
export class ListaProductosModule { }
