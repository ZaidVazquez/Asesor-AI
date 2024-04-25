import { CommonModule } from "@angular/common";
import { AsesorComponent } from "./asesor.component";
import { MaterialModule } from "src/app/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AsesorRoutingModule } from "./asesor-routing.module";
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
      AsesorComponent,
      
    ],
    imports: [
      CommonModule,
      AsesorRoutingModule,
      MaterialModule,
      ReactiveFormsModule
    ]
  })
  export class AsesorModule { }