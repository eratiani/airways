import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderStateService } from 'src/app/core/services/header-state.service';

@Component({
  selector: 'app-booking-view',
  templateUrl: './booking-view.component.html',
  styleUrls: ['./booking-view.component.css'],
})
export class BookingViewComponent implements OnInit, OnDestroy {
  constructor(private headerState: HeaderStateService) {}

  ngOnInit(): void {
    this.headerState.toggleUserOnBookingPage();
    // this.headerState.currencyFormatEmitter.subscribe(
    //   (currency) => (this.currencyFormat = currency)
    // );
  }
  ngOnDestroy(): void {
    this.headerState.toggleUserOnBookingPage();
  }
}
