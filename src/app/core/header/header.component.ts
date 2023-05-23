import { Component } from '@angular/core';
import { HeaderStateService } from '../services/header-state.service';
import { BackendUserService } from 'src/app/services/backend-user.service';
import { NavigationEnd, Router } from '@angular/router';
import { BreakpointObserveService } from 'src/app/services/breakpoints-observer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  date: string = 'DD/MM/YYYY';
  constructor(
    public headState: HeaderStateService,
    public userState: BackendUserService,
    private router: Router,
    public observer: BreakpointObserveService
  ) {
    router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.isFirstPage = ev.url === '/';
        this.isBooking = ev.url.includes('booking');
      }
    });
  }

  isFirstPage = true;
  isBooking = false;

  onDateFormatChange(format: string) {
    this.headState.changeDataFormat(format);
  }
  onCurrencyChange(curr: string) {
    this.headState.currencyFormat = curr;
  }

  handleLog() {
    // if (!this.userState.loggedIn) {
      this.headState.showAuth = true;
    // } else {
      // this.userState.logOut();
      // this.router.navigate(['cart', this.userState.userLocal.id, 'user']);
    // }
  }

  goToCart() {
    this.router.navigate(['cart', this.userState.userLocal.id, 'shopping']);
  }
}
