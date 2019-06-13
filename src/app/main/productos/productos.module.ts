import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { MatIconModule,
          MatDividerModule,
          MatTabsModule,
          MatToolbarModule} from '@angular/material';
import { ListaProductosModule } from './lista-productos/lista-productos.module';
import { ListaPaquetesModule } from './lista-paquetes/lista-paquetes.module';
import { PromocionesModule } from './promociones/promociones.module';
import { ProductComponent } from './productos.component';

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ListaProductosModule,
    ListaPaquetesModule,
    PromocionesModule,
    MatIconModule,
    MatDividerModule,
    MatTabsModule,
    MatToolbarModule
  ]
})
export class ProductosModule { }
