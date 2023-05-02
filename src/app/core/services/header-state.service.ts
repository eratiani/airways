import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MY_DATE_FORMAT } from "./date-format";
@Injectable({ providedIn: 'root' })
export class HeaderStateService  {
  showAuth = false;
  private userOnBookingPageSubject = new BehaviorSubject<boolean>(false);
  userOnBookingPage$ = this.userOnBookingPageSubject.asObservable();
  private userOnSummaryPageSubject = new BehaviorSubject<boolean>(false);
  userOnSummaryPage$ = this.userOnSummaryPageSubject.asObservable();
  private userOnpassengersPageSubject = new BehaviorSubject<boolean>(false);
  userOnpassengersPage$ = this.userOnpassengersPageSubject.asObservable();
  dateFormatEmiter = new Subject<string>()
  currencyFormatEmitter = new Subject<string>()
  constructor(){
    this.dateFormatEmiter.subscribe((date)=>{
      MY_DATE_FORMAT.display.dateInput = date;
      MY_DATE_FORMAT.parse.dateInput = date;
    })
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
}
