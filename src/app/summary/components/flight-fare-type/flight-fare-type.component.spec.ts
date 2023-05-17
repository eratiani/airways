import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightFareTypeComponent } from './flight-fare-type.component';

describe('FlightFareTypeComponent', () => {
  let component: FlightFareTypeComponent;
  let fixture: ComponentFixture<FlightFareTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightFareTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightFareTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
