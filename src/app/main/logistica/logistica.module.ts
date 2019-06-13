import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogisticaRoutingModule } from './logistica-routing.module';
import { LogisticaComponent } from './logistica.component';
import { RecepcionModule } from './recepcion/recepcion.module';
import { TrasladosModule } from './traslados/traslados.module';
import { MatIconModule, MatToolbarModule, MatTabsModule } from '@angular/material';
import { CrearTrasladoComponent } from './traslados/crear-traslado/crear-traslado.component';

@NgModule({
  declarations: [LogisticaComponent, CrearTrasladoComponent],
  imports: [
    CommonModule,
    LogisticaRoutingModule,
    RecepcionModule,
    TrasladosModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule
  ]
})
export class LogisticaModule { }
