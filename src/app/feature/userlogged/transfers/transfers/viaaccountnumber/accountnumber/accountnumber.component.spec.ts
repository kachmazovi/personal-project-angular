import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountnumberComponent } from './accountnumber.component';

describe('AccountnumberComponent', () => {
  let component: AccountnumberComponent;
  let fixture: ComponentFixture<AccountnumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountnumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
