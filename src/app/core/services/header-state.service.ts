import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeaderStateService {
  showAuth = false;
  private userOnBookingPageSubject = new BehaviorSubject<boolean>(false);
  userOnBookingPage$ = this.userOnBookingPageSubject.asObservable();
  private userOnSummaryPageSubject = new BehaviorSubject<boolean>(false);
  userOnSummaryPage$ = this.userOnSummaryPageSubject.asObservable();
  private userOnpassengersPageSubject = new BehaviorSubject<boolean>(false);
  userOnpassengersPage$ = this.userOnpassengersPageSubject.asObservable();

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
}
