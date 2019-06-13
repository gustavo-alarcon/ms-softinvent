import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrasladosComponent } from './traslados.component';

const routes: Routes = [
  {
    path: '',
    component: TrasladosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrasladosRoutingModule { }
