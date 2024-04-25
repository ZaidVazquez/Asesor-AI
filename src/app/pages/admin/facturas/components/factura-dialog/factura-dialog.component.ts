import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Rol } from 'src/app/shared/models/rol.interface';
import { BaseForm } from 'src/app/shared/utils/base-form';
import { FacturaService } from '../../services/factura.service';

enum Action {
  NEW = 'new',
  EDIT = 'edit'
}

@Component({
  selector: 'app-factura-dialog',
  templateUrl: './factura-dialog.component.html',
  styleUrls: ['./factura-dialog.component.scss']
})
export class FacturaDialogComponent  implements OnInit, OnDestroy {
  
  private destroy$ = new Subject();
  actionTODO = Action.NEW;
  tittleButton = "Guardar";
  hidePwd = true;
  hideConfirmPwd = true;

  billForm = this.fb.group({
    cveFactura: [''],
    rfc: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(13)]],
    direccion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
    cfdi: ['', [Validators.required]],
    
  }, {})
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public dialogRef: MatDialogRef<FacturaDialogComponent>,
  private fb: FormBuilder,
  public baseForm: BaseForm,
  private authSvc: FacturaService) { }

  ngOnInit(): void {
    //verificar si el usuario existe 
    if (this.data.bill.cveFactura){
     this.pathData();
    }
  }

  private pathData (){
    this.actionTODO = Action.EDIT;
    this.tittleButton = "Actualizar";

    
    //path values to form
    this.billForm.patchValue({
      cveFactura: this.data.bill.cveFactura,
      rfc: this.data.bill.rfc,
      direccion: this.data.bill.direccion,
      cfdi: this.data.bill.cfdi
    });

    //Bloquear apartado usuario


  //Eliminar validaciones de las contraseñas
 
  }

  onSave() {
  //TO DO: 
  if (this.billForm.invalid) return;
//bitener data de usuario
  var data = this.billForm.getRawValue(); 

  //TO DO: verificar el tipo de acción: save, edit 
  if(this.actionTODO == Action.NEW) { //guardar
 //Obtener la información a guardar 
  const {cveFactura, ...bill} = data;

  this.authSvc.new(bill).pipe(takeUntil(this.destroy$)).subscribe( result => {
    if (result){
      this.dialogRef.close(result);
    }
  });
  }else { //actualizar
 
    this.authSvc.update(data).pipe(takeUntil(this.destroy$)).subscribe( result => {
      if (result) {
        this.dialogRef.close(result);
      }
    });
    
  }
  
   }

   onClear(){
    if (this.actionTODO == Action.NEW){
      this.billForm.reset();
    }else {
      this.billForm.patchValue({
        cveFactura: this.data.bill.cveFactura,
        rfc: '',
        direccion: '',
        cfdi: '',
      })
    }
   }


  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}

