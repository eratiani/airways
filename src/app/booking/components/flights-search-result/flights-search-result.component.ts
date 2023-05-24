import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreType } from 'src/app/redux/store.model';
import { FlightDataType } from '../../../models/flyght-data.model';
import { SideType } from '../one-side/one-side.component';
import { selectFlight } from 'src/app/redux/actions';

@Component({
  selector: 'app-flights-search-result',
  templateUrl: './flights-search-result.component.html',
  styleUrls: ['./flights-search-result.component.css'],
})
export class FlightsSearchResultComponent {
  constructor(
    private store: Store<StoreType>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    store.select('flightData', 'oneWay').subscribe((data) => {
      this.oneWayFlights = data;
      console.log('oneway: ', this.oneWayFlights);
    });
    store.select('flightData', 'backWay').subscribe((data) => {
      this.backFlights = data;
      console.log('back: ', this.backFlights);
    });
  }
  oneWayFlights?: FlightDataType[];
  backFlights?: FlightDataType[];

  selectedData?: StoreType['selectedFlight'];

  storeChoise(type: SideType, flight: FlightDataType) {
    this.selectedData =
      type === 'one-way'
        ? { ...this.selectedData, oneWay: flight }
        : { ...this.selectedData, backWay: flight };
  }

  clickBack() {
    this.router.navigateByUrl('');
  }

  clickContinue() {
    console.log(this.selectedData);
    if (!this.selectedData) {
      return;
    }
    this.store.dispatch(selectFlight(this.selectedData));
    this.router.navigate(['detail'], { relativeTo: this.route });
  }
}
