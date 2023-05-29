import { Component } from '@angular/core';
import { HeaderStateService } from 'src/app/core/services/header-state.service';

@Component({
  selector: 'app-authentication-form-container',
  templateUrl: './authentication-form-container.component.html',
  styleUrls: ['./authentication-form-container.component.css'],
})
export class AuthenticationFormContainerComponent {
  isActive: boolean = false;
  constructor(public headerState: HeaderStateService) {}

  onLoginActive() {
    this.isActive = false;
  }
  onRegisterActive() {
    this.isActive = true;
  }

  onHideOverlay(ev: Event) {
    if ((ev.target as HTMLElement).classList.contains('overlay'))
      this.headerState.showAuth = false;
  }
}
