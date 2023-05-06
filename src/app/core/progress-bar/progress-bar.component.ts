import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderStateService } from '../services/header-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  userOnBookingPage!: boolean;
  userOnPassangersPage!: boolean;
  userOnSummaryPage!: boolean;
  userOnShoppingCartPage!: boolean;
  private subscriptions = new Subscription();
  constructor(private headState: HeaderStateService) {}
  ngOnInit(): void {
    this.subscribePageState();
  }
  subscribePageState() {
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
    this.subscriptions.add(
      this.headState.userOnShoppingCartPage$.subscribe(
        (userOnShoppingCartPage) =>
          (this.userOnShoppingCartPage = userOnShoppingCartPage)
      )
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
