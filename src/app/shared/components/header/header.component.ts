import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

 data = {
  cveUsuario: 0,
  nombre: '',
  apellidos: '',
  username: '',
  email: '',
  roles: []
 }
 
 isLogged= false;
 private destroy$ = new Subject<any>();
 @Output() toggleSidenav = new EventEmitter<void>();
 constructor(private authSvc: AuthService) { }

 ngOnInit(): void { 
  this.authSvc.isLogged$.pipe(takeUntil(this.destroy$)).subscribe((isLogged) => {
    this.isLogged = isLogged;
  });

  this.authSvc.tokenData$.pipe(takeUntil(this.destroy$)).subscribe( (data) => {
    this.data = data;
  });
 }

 onToggleSidenav() {
  this.toggleSidenav.emit();
 }

 onLogout() {
  this.authSvc.logout();
 }

 ngOnDestroy(): void {
  this.destroy$.next({});
  this.destroy$.complete();
  }
}
