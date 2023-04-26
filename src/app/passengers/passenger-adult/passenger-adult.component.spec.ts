import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerAdultComponent } from './passenger-adult.component';

describe('PassengerAdultComponent', () => {
  let component: PassengerAdultComponent;
  let fixture: ComponentFixture<PassengerAdultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerAdultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerAdultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
