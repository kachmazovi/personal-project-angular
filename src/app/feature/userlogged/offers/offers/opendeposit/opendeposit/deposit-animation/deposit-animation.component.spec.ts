import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositAnimationComponent } from './deposit-animation.component';

describe('DepositAnimationComponent', () => {
  let component: DepositAnimationComponent;
  let fixture: ComponentFixture<DepositAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositAnimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
