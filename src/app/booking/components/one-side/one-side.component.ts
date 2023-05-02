import { Component, Input } from '@angular/core';
import { FlightDataType } from 'src/app/models/flyght-data.model';

@Component({
  selector: 'one-side',
  styleUrls: ['./one-side.component.css'],
  templateUrl: './one-side.component.html',
})
export class OneSideComponent {
  @Input() flights: FlightDataType[] = [];
  selectedCard?: FlightDataType;

  selectCard(flightCard: HTMLDivElement, flight: FlightDataType) {
    // remove 'moveElement' from all cards
    Array.from(flightCard.parentElement?.children || []).forEach((elem) => {
      elem.classList.remove('moveElement');
    });
    flightCard.classList.add('moveElement');
    this.selectedCard = flight;
  }
}
