import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationFormContainerComponent } from './authentication-form-container.component';

describe('AuthenticationFormContainerComponent', () => {
  let component: AuthenticationFormContainerComponent;
  let fixture: ComponentFixture<AuthenticationFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthenticationFormContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
