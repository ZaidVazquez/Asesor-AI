import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaDialogComponent } from './factura-dialog.component';

describe('FacturaDialogComponent', () => {
  let component: FacturaDialogComponent;
  let fixture: ComponentFixture<FacturaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturaDialogComponent]
    });
    fixture = TestBed.createComponent(FacturaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
