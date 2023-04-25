import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() signIn: EventEmitter<boolean> = new EventEmitter<boolean>();
  selected = 'option2';
  onSignIn() {
    this.signIn.emit(true);
  }
}
