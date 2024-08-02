import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangageEmployeeComponent } from './mangage-employee.component';

describe('MangageEmployeeComponent', () => {
  let component: MangageEmployeeComponent;
  let fixture: ComponentFixture<MangageEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangageEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MangageEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
