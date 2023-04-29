import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderStateService } from '../services/header-state.service';
import { BackendUserService } from 'src/app/services/backend-user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
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
      this.headState.userOnpassengersPage$.subscribe((userOnPassangersPage) => {
        console.log(userOnPassangersPage);

        this.userOnPassangersPage = userOnPassangersPage;
      })
    );
    this.subscriptions.add(
      this.headState.userOnSummaryPage$.subscribe(
        (userOnSummaryPage) => (this.userOnSummaryPage = userOnSummaryPage)
      )
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
