import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  currencyFormat = 'USD';
  dateFormat = 'DD/MM/YYYY';

  changeDataFormat(format: string) {
    this.dateFormat = format;
    MY_DATE_FORMAT.display = {
      dateInput: format,
      monthYearLabel: format
        .replace('/', ' ')
        .replace('DD', '')
        .replace('MM', 'MMM'),
    };
    MY_DATE_FORMAT.parse.dateInput = format;
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
}
