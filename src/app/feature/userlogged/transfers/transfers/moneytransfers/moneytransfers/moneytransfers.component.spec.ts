import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneytransfersComponent } from './moneytransfers.component';

describe('MoneytransfersComponent', () => {
  let component: MoneytransfersComponent;
  let fixture: ComponentFixture<MoneytransfersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneytransfersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneytransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
