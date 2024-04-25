import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { BaseForm } from 'src/app/shared/utils/base-form';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from 'src/app/shared/models/auth.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  hide= true;
  private destroy$ = new Subject<any>();
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password:['', [Validators.required, Validators.minLength(3)]]
  })

  constructor (private fb: FormBuilder, public baseForm: BaseForm, private authSvc: AuthService, private snackBar: MatSnackBar) {
    console.log("Init Constructor")
  }
 
  ngOnInit(): void {
    console.log("Init NgOnInit")
    
  }

  onLogin(){
    //validar que el formulario es correcto
    if (this.loginForm.invalid) return;

    //obtener la información del formulario y se almacena en una variable form
    const form = this.loginForm.value;
    this.authSvc.login(form).pipe(takeUntil(this.destroy$)).subscribe( (data: AuthResponse) =>{
      this.snackBar.open(data.mensaje, '', {
        duration: 5 * 1000,
        horizontalPosition: 'end', verticalPosition: 'top', panelClass: ['success-snackbar']
      });
    });
    

  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
