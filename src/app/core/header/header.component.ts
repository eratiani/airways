import { Component, OnInit } from '@angular/core';
import { HeaderStateService } from '../services/header-state.service';
import { BackendUserService } from 'src/app/services/backend-user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userOnBookingPage!: boolean;
  userOnPassangersPage!: boolean;
  userOnSummaryPage!: boolean;
  private subscriptions = new Subscription();
  constructor(
    private headState: HeaderStateService,
    public userState: BackendUserService
  ) {}
  ngOnInit(): void {
    this.subscriptions.add(
      this.headState.userOnBookingPage$.subscribe(
        (userOnBookingPage) => (this.userOnBookingPage = userOnBookingPage)
      )
    );
    this.subscriptions.add(
      this.headState.userOnBookingPage$.subscribe(
        (userOnBookingPage) => (this.userOnBookingPage = userOnBookingPage)
      )
    );
    this.subscriptions.add(
      this.headState.userOnBookingPage$.subscribe(
        (userOnBookingPage) => (this.userOnBookingPage = userOnBookingPage)
      )
    );
  }
  selected = 'option2';
  handleLog() {
    if (!this.userState.loggedIn) {
      this.headState.showAuth = true;
    } else {
      this.userState.logOut();
    }
  }
}
