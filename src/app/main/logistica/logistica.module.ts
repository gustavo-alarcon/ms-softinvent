import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogisticaRoutingModule } from './logistica-routing.module';
import { LogisticaComponent } from './logistica.component';
import { RecepcionModule } from './recepcion/recepcion.module';
import { TrasladosModule } from './traslados/traslados.module';
import { MatIconModule, MatToolbarModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatAutocompleteModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTooltipModule, MatDividerModule, MatSelectModule, MatDialogModule, MatMenuModule } from '@angular/material';

@NgModule({
  declarations: [LogisticaComponent],
  imports: [
    CommonModule,
    LogisticaRoutingModule,
    RecepcionModule,
    TrasladosModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatDividerModule,
    MatSelectModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule
  ]
})
export class LogisticaModule { }
