import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpendepositComponent } from './opendeposit.component';

describe('OpendepositComponent', () => {
  let component: OpendepositComponent;
  let fixture: ComponentFixture<OpendepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpendepositComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpendepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
