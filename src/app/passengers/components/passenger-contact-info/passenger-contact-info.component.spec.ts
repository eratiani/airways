import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerContactInfoComponent } from './passenger-contact-info.component';

describe('PassengerContactInfoComponent', () => {
  let component: PassengerContactInfoComponent;
  let fixture: ComponentFixture<PassengerContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerContactInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
