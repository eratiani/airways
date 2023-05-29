import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreType } from 'src/app/redux/store.model';
import { FlightDataType } from '../../../models/flyght-data.model';
import { SideType } from '../one-side/one-side.component';
import { selectFlight } from 'src/app/redux/actions';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-flights-search-result',
  templateUrl: './flights-search-result.component.html',
  styleUrls: ['./flights-search-result.component.css'],
})
export class FlightsSearchResultComponent implements OnDestroy {
  constructor(
    private store: Store<StoreType>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    store
      .select('flightData', 'oneWay')
      .pipe(takeUntil(this.destroyer))
      .subscribe((data) => {
        this.oneWayFlights = data;
      });
    store
      .select('flightData', 'backWay')
      .pipe(takeUntil(this.destroyer))
      .subscribe((data) => {
        this.backFlights = data;
      });
    store
      .select('selectedFlight')
      .pipe(takeUntil(this.destroyer))
      .subscribe((selected) => {
        this.selectedData = selected;
      });
  }

  oneWayFlights?: FlightDataType[];
  backFlights?: FlightDataType[];
  destroyer = new Subject<void>();

  selectedData?: StoreType['selectedFlight'];

  ngOnDestroy(): void {
    this.destroyer.next();
    this.destroyer.complete();
  }

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
    if (!this.selectedData) {
      return;
    }
    this.store.dispatch(selectFlight(this.selectedData));
    this.router.navigate(['detail'], { relativeTo: this.route });
  }
}
