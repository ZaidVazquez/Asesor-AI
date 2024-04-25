import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsesorComponent,  } from './asesor.component';

const routes: Routes = [{ path: '', component: AsesorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsesorRoutingModule { }