import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersViewComponent } from './passengers-view.component';

describe('PassengersViewComponent', () => {
  let component: PassengersViewComponent;
  let fixture: ComponentFixture<PassengersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengersViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
