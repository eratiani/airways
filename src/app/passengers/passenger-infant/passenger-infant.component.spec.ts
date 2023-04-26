import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerInfantComponent } from './passenger-infant.component';

describe('PassengerInfantComponent', () => {
  let component: PassengerInfantComponent;
  let fixture: ComponentFixture<PassengerInfantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerInfantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerInfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
