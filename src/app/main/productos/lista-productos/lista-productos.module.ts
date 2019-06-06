import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaProductosRoutingModule } from './lista-productos-routing.module';
import { ListaProductosComponent } from './lista-productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatIconModule,
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
          MatMenuModule} from '@angular/material';
import { ConfirmDeleteProductComponent } from './confirmar-borrar-producto/confirmar-borrar-producto.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';


@NgModule({
  declarations: [
    ListaProductosComponent,
    ConfirmDeleteProductComponent,
    CrearProductoComponent,
    EditarProductoComponent
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
    MatMenuModule
  ],
  entryComponents: [
    ConfirmDeleteProductComponent,
    CrearProductoComponent,
    EditarProductoComponent
  ]
})
export class ListaProductosModule { }
