import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FlightDataType } from 'src/app/models/flyght-data.model';
import { OneSideStateService } from '../../services/one-side-state.service';

export type SideType = 'one-way' | 'back';

@Component({
  selector: 'one-side',
  styleUrls: ['./one-side.component.css'],
  templateUrl: './one-side.component.html',
  providers: [OneSideStateService],
})
export class OneSideComponent {
  @Input() type!: SideType;
  @Input() flights: FlightDataType[] = [];
  @Output() storeSelect = new EventEmitter<FlightDataType>();
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
      this.storeSelect.emit(this.selectedCard);
    } else {
      this.state.setUnselected();
    }
  }
}
