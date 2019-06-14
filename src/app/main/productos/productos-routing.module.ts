import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './productos.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: 'product-list',
        loadChildren: './lista-productos/lista-productos.module#ListaProductosModule'
      },
      {
        path: 'package-list',
        loadChildren: './lista-paquetes/lista-paquetes.module#ListaPaquetesModule'
      },
      {
        path: 'promos',
        loadChildren: './promociones/promociones.module#PromocionesModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
