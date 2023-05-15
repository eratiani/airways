import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FlightDataType,
  ReservationDataType,
} from 'src/app/models/flyght-data.model';
import { StoreType } from 'src/app/redux/store.model';

@Component({
  selector: 'app-flight-fare',
  templateUrl: './flight-fare.component.html',
  styleUrls: ['./flight-fare.component.css'],
})
export class FlightFareComponent implements OnInit {
  @Input() oneWayFlight?: FlightDataType;
  @Input() backFlight?: FlightDataType;
  @Input() flightDetails!: any;
  passengerCount!: any;
  constructor(private store: Store<StoreType>) {}
  ngOnInit(): void {
    this.store
      .select('passengersCount')
      .subscribe((data) => (this.passengerCount = data));
    console.log(this.passengerCount);
  }
  totalPrice() {
    if (!this.oneWayFlight) return;
    let priceSum = 0;
    const prices = document.querySelectorAll('.price__Ticket').forEach((e) => {
      priceSum += Number(e.textContent);
    });

    return priceSum;
  }
}
