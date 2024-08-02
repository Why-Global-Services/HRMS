import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttenDetailsEmpComponent } from './atten-details-emp.component';

describe('AttenDetailsEmpComponent', () => {
  let component: AttenDetailsEmpComponent;
  let fixture: ComponentFixture<AttenDetailsEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttenDetailsEmpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttenDetailsEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
