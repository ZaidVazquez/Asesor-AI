import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturasRoutingModule } from './facturas-routing.module';
import { FacturasComponent } from './facturas.component';
import { FacturaDialogComponent } from './components/factura-dialog/factura-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    FacturasComponent,
    FacturaDialogComponent
  ],
  imports: [
    CommonModule,
    FacturasRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FacturasModule { }
