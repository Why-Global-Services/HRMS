import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipHomeComponent } from './payslip-home.component';

describe('PayslipHomeComponent', () => {
  let component: PayslipHomeComponent;
  let fixture: ComponentFixture<PayslipHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayslipHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayslipHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
