import { Component } from '@angular/core';

@Component({
  selector: 'app-authentication-form-container',
  templateUrl: './authentication-form-container.component.html',
  styleUrls: ['./authentication-form-container.component.css']
})
export class AuthenticationFormContainerComponent {
  isActive:boolean = false;
  onLoginActive() {
    this.isActive = false;
    return this.isActive
  }
  onRegisterActive() {
    this.isActive = true;
    return this.isActive
  }
}
