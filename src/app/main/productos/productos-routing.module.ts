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
        loadChildren: () => import('src/app/main/productos/lista-productos/lista-productos.module').then(mod => mod.ListaProductosModule)
      },
      {
        path: 'package-list',
        loadChildren: () => import('src/app/main/productos/lista-paquetes/lista-paquetes.module').then(mod => mod.ListaPaquetesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
