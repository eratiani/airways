import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreType } from 'src/app/redux/store.model';
import { FlightDataType } from '../../models/flyght-data.model';

@Component({
  selector: 'app-flights-search-result',
  templateUrl: './flights-search-result.component.html',
  styleUrls: ['./flights-search-result.component.css'],
})
export class FlightsSearchResultComponent {
  selectedCard?: FlightDataType;
  constructor(private store: Store<StoreType>, private router: Router) {
    store.select('flightData').subscribe((data) => {
      this.matchedFlights = data;
    });
  }
  matchedFlights: FlightDataType[] = [];

  selectCard(flightCard: HTMLDivElement, flight: FlightDataType) {
    // remove 'moveElement' from all cards
    Array.from(flightCard.parentElement?.children || []).forEach((elem) => {
      elem.classList.remove('moveElement');
    });
    flightCard.classList.add('moveElement');
    this.selectedCard = flight;
  }

  clickBack() {
    this.router.navigateByUrl('');
  }

  clickContinue() {}
}
