import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalnumberComponent } from './personalnumber.component';

describe('PersonalnumberComponent', () => {
  let component: PersonalnumberComponent;
  let fixture: ComponentFixture<PersonalnumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalnumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
