import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPaquetesRoutingModule } from './lista-paquetes-routing.module';
import { ListaPaquetesComponent } from './lista-paquetes.component';

@NgModule({
  declarations: [
    ListaPaquetesComponent
  ],
  imports: [
    CommonModule,
    ListaPaquetesRoutingModule
  ]
})
export class ListaPaquetesModule { }
