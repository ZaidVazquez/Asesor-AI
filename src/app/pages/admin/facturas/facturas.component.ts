import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { FacturaDialogComponent } from './components/factura-dialog/factura-dialog.component';
import { FacturaService } from './services/factura.service';
import { FacturaResponse } from 'src/app/shared/models/factura.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit, OnDestroy{

    private destroy$= new Subject();
    Facturas: FacturaResponse[] = [];
    constructor(private dialog: MatDialog, private snackbar: MatSnackBar, private facturaSvc: FacturaService){}
  
    ngOnInit(): void {
        this.listar();
    }
  
    private listar(){ 
      this.facturaSvc.getFacturas()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.Facturas = data;
      })
    }
  
    onOpenModal(bill = {}){
      const dialogRef=this.dialog.open(FacturaDialogComponent,{
        minWidth: '60%',
        data: {
          title: 'Registro de Facturas',
          bill
        }
      });
  
      dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
        if (result) {
          this.listar();
          this.snackbar.open(result.mensaje, '',{
            duration: 5000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
  
          });
        }
      })
    }
    onDelete(cveFactura: number){
      Swal.fire({
        text: '¿Realmente desea eliminar el registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'btn-primary',
        cancelButtonColor: 'red',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then( (result) => {
        if (result.isConfirmed) {
          this.facturaSvc.delete(cveFactura).pipe(takeUntil(this.destroy$)).subscribe( result => {
            if (result) {
              this.snackbar.open(result.mensaje, '', {
                duration: 5000,
                panelClass: ['success-snackbar'],
                horizontalPosition: 'right',
                verticalPosition: 'top'
              });
              this.listar();
            }
          });
        }
      });
    }
  
    ngOnDestroy(): void {
        this.destroy$.next({});
        this.destroy$.complete();
    }
  
  }
  
