import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeloanComponent } from './takeloan.component';

describe('TakeloanComponent', () => {
  let component: TakeloanComponent;
  let fixture: ComponentFixture<TakeloanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeloanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
