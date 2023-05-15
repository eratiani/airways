import { Component } from '@angular/core';
import { HeaderStateService } from '../services/header-state.service';
import { BackendUserService } from 'src/app/services/backend-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  date: string = 'DD/MM/YYYY';
  currency: string = 'USD';
  constructor(
    private headState: HeaderStateService,
    public userState: BackendUserService,
    private router: Router
  ) {}

  onDateFormatChage() {
    this.headState.changeDataFormat(this.date);
  }
  oncurrencyFormatChage() {
    this.headState.currencyFormat = this.currency;
  }

  handleLog() {
    if (!this.userState.loggedIn) {
      this.headState.showAuth = true;
    } else {
      // this.userState.logOut();
      this.router.navigate(['acount', this.userState.userLocal.id]);
    }
  }
}
