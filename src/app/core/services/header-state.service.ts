import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, Subscription } from 'rxjs';
import { MY_DATE_FORMAT } from './date-format';
@Injectable({ providedIn: 'root' })
export class HeaderStateService {
  showAuth = false;
  private userOnBookingPageSubject = new BehaviorSubject<boolean>(false);
  userOnBookingPage$ = this.userOnBookingPageSubject.asObservable();
  private userOnSummaryPageSubject = new BehaviorSubject<boolean>(false);
  userOnSummaryPage$ = this.userOnSummaryPageSubject.asObservable();
  private userOnpassengersPageSubject = new BehaviorSubject<boolean>(false);
  userOnpassengersPage$ = this.userOnpassengersPageSubject.asObservable();
  private userOnShoppingCartPageSubject = new BehaviorSubject<boolean>(false);
  userOnShoppingCartPage$ = this.userOnShoppingCartPageSubject.asObservable();
  dateFormatEmiter = new ReplaySubject<string>(2);
  currencyFormatEmitter = new ReplaySubject<string>(2);
  dateFormatSub!: Subscription;
  currencyFormat = 'USD';
  dateFormat = 'DD/MM/YYYY';
  constructor() {
    this.dateFormatSub = this.dateFormatEmiter.subscribe((date) => {
      MY_DATE_FORMAT.display.dateInput = date;
      MY_DATE_FORMAT.parse.dateInput = date;
    });
  }

  changeDataFormat(format: string) {
    this.dateFormat = format;
    MY_DATE_FORMAT.display.dateInput = format;
    MY_DATE_FORMAT.parse.dateInput = format;
    console.log(this.dateFormat);
  }
  toggleUserOnBookingPage() {
    this.userOnBookingPageSubject.next(!this.userOnBookingPageSubject.value);
  }

  toggleUserOnSummaryPage() {
    this.userOnSummaryPageSubject.next(!this.userOnSummaryPageSubject.value);
  }
  toggleUserOnPassengersPage() {
    this.userOnpassengersPageSubject.next(
      !this.userOnpassengersPageSubject.value
    );
  }
  toggleUserOnShoppingCartPage() {
    this.userOnShoppingCartPageSubject.next(
      !this.userOnShoppingCartPageSubject.value
    );
  }
  unsubscribe(): void {
    if (this.dateFormatSub) {
      this.dateFormatSub.unsubscribe();
    }
  }
}
