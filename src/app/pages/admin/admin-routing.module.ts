import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [{ path: '', component: AdminComponent }, { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) }, { path: 'asesor', loadChildren: () => import('./asesor/asesor.module').then(m => m.AsesorModule) }, { path: 'productos', loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule) }, { path: 'facturas', loadChildren: () => import('./facturas/facturas.module').then(m => m.FacturasModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
