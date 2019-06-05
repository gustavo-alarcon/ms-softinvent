import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPaquetesComponent } from './lista-paquetes.component';

const routes: Routes = [
  {
    path: '',
    component: ListaPaquetesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaPaquetesRoutingModule { }
