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
        loadChildren: () => import('src/app/main/logistica/recepcion/recepcion.module').then(mod => mod.RecepcionModule)
      },
      {
        path: 'transfer-list',
        loadChildren: () => import('src/app/main/logistica/traslados/traslados.module').then(mod => mod.TrasladosModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticaRoutingModule { }
