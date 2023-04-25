import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsSearchInputComponent } from './flights-search-input.component';

describe('FlightsSearchInputComponent', () => {
  let component: FlightsSearchInputComponent;
  let fixture: ComponentFixture<FlightsSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightsSearchInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
