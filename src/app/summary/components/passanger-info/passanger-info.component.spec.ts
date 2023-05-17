import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassangerInfoComponent } from './passanger-info.component';

describe('PassangerInfoComponent', () => {
  let component: PassangerInfoComponent;
  let fixture: ComponentFixture<PassangerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassangerInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassangerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
