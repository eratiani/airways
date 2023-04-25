import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnFlightSelectedComponent } from './return-flight-selected.component';

describe('ReturnFlightSelectedComponent', () => {
  let component: ReturnFlightSelectedComponent;
  let fixture: ComponentFixture<ReturnFlightSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnFlightSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnFlightSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
