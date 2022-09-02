import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAnimationComponent } from './loan-animation.component';

describe('LoanAnimationComponent', () => {
  let component: LoanAnimationComponent;
  let fixture: ComponentFixture<LoanAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAnimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
