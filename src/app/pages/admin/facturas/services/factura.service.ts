import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs';
import { FacturaResponse } from 'src/app/shared/models/factura.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private snackBar: MatSnackBar, 
    private http: HttpClient,) { }

    getFacturas():Observable<FacturaResponse[]> { 
      return this.http.get<FacturaResponse[]>(`${environment.API_URL}/factura`,{headers:{"requireToken":"true"}})
        .pipe(catchError((error)=> this.handlerError(error)));
    }
  
    new(bill: any) {
  
      return this.http.post<any>(`${environment.API_URL}/factura`,bill,{headers:{"requireToken" : "true"}})
        .pipe(catchError((error)=>this.handlerError(error)))
     }
  
    update(bill: any) {
  
      return this.http.put<any>(`${environment.API_URL}/factura`,bill,{headers:{"requireToken" : "true"}})
      .pipe(catchError((error)=>this.handlerError(error)))
     }
  
    delete(cveFactura: number) { 
      
      return this.http.delete<any>(`${environment.API_URL}/factura/${cveFactura}`,{headers:{"requireToken" : "true"}})
      .pipe(catchError((error)=>this.handlerError(error)))
      
    }
  
    handlerError(error: any): Observable<never> {
      var errorMessage = "Ocurrio un error";
      if (error.error) {
        errorMessage = `Error: ${error.error.mensaje}`;
      }
  
      this.snackBar.open(errorMessage, '', {
        duration: 5 * 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
  
      return throwError(() => new Error(errorMessage))
    }
  }
