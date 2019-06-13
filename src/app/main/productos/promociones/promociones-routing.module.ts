import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromocionesComponent } from './promociones.component';

const routes: Routes = [
  {
    path: '',
    component: PromocionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromocionesRoutingModule { }
