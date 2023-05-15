import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FlightDataType } from 'src/app/models/flyght-data.model';
import { StoreType } from 'src/app/redux/store.model';

@Component({
  selector: 'app-booking-view',
  templateUrl: './booking-view.component.html',
  styleUrls: ['./booking-view.component.css'],
})
export class BookingViewComponent {
  oneWayFlights?: FlightDataType[];
  backFlights?: FlightDataType[];
  constructor(private store: Store<StoreType>) {
    store.select('flightData', 'oneWay').subscribe((data) => {
      this.oneWayFlights = data;
    });
    store.select('flightData', 'backWay').subscribe((data) => {
      this.backFlights = data;
    });
  }
}
