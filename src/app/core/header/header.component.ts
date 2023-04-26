import { Component } from '@angular/core';
import { HeaderStateService } from '../services/header-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private headState: HeaderStateService) {}
  selected = 'option2';
  onSignIn() {
    this.headState.showAuth = true;
  }
}
