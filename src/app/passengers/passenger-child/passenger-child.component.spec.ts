import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerChildComponent } from './passenger-child.component';

describe('PassengerChildComponent', () => {
  let component: PassengerChildComponent;
  let fixture: ComponentFixture<PassengerChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
