import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { AuthResponse } from 'src/app/shared/models/auth.interface';
import { environment } from 'src/environments/environment.development';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Crear las variables de los observables
  private token = new BehaviorSubject<string>("");
  private tokenData = new BehaviorSubject<any>({});
  private isLogged = new BehaviorSubject<boolean>(false);

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private http: HttpClient) { this.checkToken();}

  get token$(): Observable<string> {
    return this.token.asObservable();
  }
  get tokenValue(){
    return this.token.getValue();
  }
  get tokenData$(): Observable<any> {
    return this.tokenData.asObservable();
  }
  get isLogged$(): Observable<boolean>{
    return this.isLogged.asObservable();
  }

  login(loginData:any){
    return this.http.post<AuthResponse>(`${ environment.API_URL }/auth`, loginData)
      .pipe(map( (data:AuthResponse) =>{
        //Verificar al usuario
        if (data.token){
          this.saveLocalStorage(data.token);
          this.token.next(data.token);
          this.isLogged.next(true);
          this.checkToken();

          this.router.navigate(['/home']);
        }


        return data;
      }),
      catchError( (error) => this.handledError(error)));
   }

  saveLocalStorage(token: string){
    localStorage.setItem("jwt", token)
   }

   logout() {
    localStorage.removeItem("jwt");
    this.token.next("");
    this.tokenData.next(null);
    this.isLogged.next(false);
    this.router.navigate(['/home']);
  }

  checkToken() {
    // Obtener el token de LocalStorage
    const token = localStorage.getItem("jwt");
    //Verificar si el token existe
    if(token){
    //Verificar si el token expiro
    //true = expiro el token
    //false = token activo
    const isExpired = helper.isTokenExpired(token);

    //En caso de que el token expire de debe de cerrar la sesion
    if(isExpired) this.logout();
    else{
      //Indicar al Observable Token que actualice la informacion
      this.token.next(token);
      //Renovar los datos del perfil
      const {iat, exp, ...data} = helper.decodeToken(token);
      this.tokenData.next(data);
      this.isLogged.next(true);
    }
  }else{
    this.logout();
  }


}
  

  handledError(error: any): Observable<never> {
    var errorMessage = "Ocurrio un error";
    if(error.error){
      errorMessage = `Error: ${error.error.mensaje } `
    }
    this.snackBar.open(errorMessage, '',{
      duration: 5 * 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });

    return throwError(()=> new Error(errorMessage));
   }
}