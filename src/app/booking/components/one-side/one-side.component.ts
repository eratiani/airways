import { Component, Input } from '@angular/core';
import { FlightDataType } from 'src/app/models/flyght-data.model';
import { OneSideStateService } from '../../services/one-side-state.service';

@Component({
  selector: 'one-side',
  styleUrls: ['./one-side.component.css'],
  templateUrl: './one-side.component.html',
  providers: [OneSideStateService],
})
export class OneSideComponent {
  @Input() flights: FlightDataType[] = [];
  selectedCard?: FlightDataType;

  constructor(public state: OneSideStateService) {}

  selectCard(flightCard: HTMLDivElement, flight: FlightDataType) {
    // remove 'moveElement' from all cards
    Array.from(flightCard.parentElement?.children || []).forEach((elem) => {
      elem.classList.remove('moveElement');
    });
    flightCard.classList.add('moveElement');
    this.selectedCard = flight;
  }

  selectFlight(doSelect: boolean) {
    if (doSelect) {
      this.state.setSelected();
    } else {
      this.state.setUnselected();
    }
  }
}