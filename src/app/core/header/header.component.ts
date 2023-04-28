import { Component } from '@angular/core';
import { HeaderStateService } from '../services/header-state.service';
import { BackendUserService } from 'src/app/services/backend-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private headState: HeaderStateService,
    public userState: BackendUserService
  ) {}
  selected = 'option2';
  handleLog() {
    if (!this.userState.loggedIn) {
      this.headState.showAuth = true;
    } else {
      this.userState.logOut();
    }
  }
}
