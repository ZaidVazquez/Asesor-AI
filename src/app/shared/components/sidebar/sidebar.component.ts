import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Perfil } from '../../models/perfil.interface';
import { AuthService } from 'src/app/pages/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  data: Perfil | undefined;
  menus: any[] = [];
  constructor (private authSvc: AuthService) {}

  ngOnInit(): void {
      this.authSvc.tokenData$.pipe(takeUntil(this.destroy$)).subscribe((data) =>{
        this.data = data;
        this.generarMenu();
      });
  }

  private generarMenu(){
    this.menus = [];
    var roles = this.data?.roles;
    if(roles){
      // realizar un ciclo for para el arreglo roles
      for (let rol of roles) {
        //si es administrador
        //usuarios
        //categorias
        //productos
        if (rol.clave == 'admin'){
          this.menus.push(...[
            {icon: 'manage_accounts', name: 'Usuarios', route: 'admin/usuarios'},
            {icon: 'category', name: 'Asesor', route: 'admin/asesor'},
        
          ]);
        }

        //si es ventas
        //ventas
        //reportes
        if (rol.clave == 'ventas'){
          this.menus.push(...[
            
            
          ]);
        }
      }
    }
  }

  ngOnDestroy(): void {
      this.destroy$.next({});
      this.destroy$.complete();
  }

}
