import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  FlightDataType,
  ReservationDataType,
} from 'src/app/models/flyght-data.model';
import { StoreType } from 'src/app/redux/store.model';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.css'],
})
export class SummaryViewComponent {
  passangersInfo!: ReservationDataType;
  oneWayFlight?: FlightDataType;
  backFlight?: FlightDataType;

  constructor(private store: Store<StoreType>, private router: Router) {
    this.store
      .select('reservations')
      .subscribe((data) => (this.passangersInfo = data[data.length - 1]));
    console.log('passengers', this.passangersInfo);
    this.store.select('selectedFlight', 'oneWay').subscribe((data) => {
      console.log('oneway data', data);
      this.oneWayFlight = data;
    });
    this.store.select('selectedFlight', 'backWay').subscribe((data) => {
      console.log('backflight', data);
      this.backFlight = data;
    });
  }

  goBack() {
    this.router.navigateByUrl('booking/detail');
  }
}
