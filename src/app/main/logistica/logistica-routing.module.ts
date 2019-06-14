import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogisticaComponent } from './logistica.component';

const routes: Routes = [
  {
    path: '',
    component: LogisticaComponent,
    children: [
      {
        path: 'reception-list',
        loadChildren: './recepcion/recepcion.module#RecepcionModule'
      },
      {
        path: 'transfer-list',
        loadChildren: './traslados/traslados.module#TrasladosModule'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticaRoutingModule { }
