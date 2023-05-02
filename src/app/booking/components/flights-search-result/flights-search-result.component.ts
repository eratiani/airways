import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreType } from 'src/app/redux/store.model';
import { FlightDataType } from '../../../models/flyght-data.model';

@Component({
  selector: 'app-flights-search-result',
  templateUrl: './flights-search-result.component.html',
  styleUrls: ['./flights-search-result.component.css'],
})
export class FlightsSearchResultComponent {
  constructor(private store: Store<StoreType>, private router: Router) {
    store.select('flightData', 'oneWay').subscribe((data) => {
      this.oneWayFlights = data;
    });
    store.select('flightData', 'backWay').subscribe((data) => {
      this.backFlights = data;
    });
  }
  oneWayFlights: FlightDataType[] = [];
  backFlights?: FlightDataType[];

  clickBack() {
    this.router.navigateByUrl('');
  }

  clickContinue() {}
}
