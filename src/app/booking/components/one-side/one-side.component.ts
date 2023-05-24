import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FlightDataType } from 'src/app/models/flyght-data.model';
import { OneSideStateService } from '../../services/one-side-state.service';
import { HeaderStateService } from 'src/app/core/services/header-state.service';

export type SideType = 'one-way' | 'back';

@Component({
  selector: 'one-side',
  styleUrls: ['./one-side.component.css'],
  templateUrl: './one-side.component.html',
  providers: [OneSideStateService],
})
export class OneSideComponent implements OnChanges {
  // @Input() type!: SideType;
  @Input() flights: FlightDataType[] = [];
  flightsCurrent: FlightDataType[] = [];
  @Output() storeSelect = new EventEmitter<FlightDataType>();
  selectedCard?: FlightDataType;
  flightIndex: number = 0;
  constructor(
    public state: OneSideStateService,
    public headerState: HeaderStateService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flights']) {
      this.flights = changes['flights'].currentValue;
      this.flightsCurrent = this.flights.slice(0, 5);
    }
  }

  selectCard(flightCard: HTMLDivElement, flight: FlightDataType) {
    Array.from(flightCard.parentElement?.children || []).forEach((elem) => {
      elem.classList.remove('moveElement');
    });
    flightCard.classList.add('moveElement');
    this.selectedCard = flight;
  }

  moveRIght() {
    if (this.flights.length < 5) return;
    this.flightIndex = (this.flightIndex + 1) % this.flights.length;
    this.render();
  }

  moveLeft() {
    if (this.flights.length < 5) return;
    this.flightIndex =
      (this.flightIndex - 1 + this.flights.length) % this.flights.length;
    this.render();
  }

  render() {
    const startIndex = this.flightIndex;
    const endIndex = (this.flightIndex + 5) % this.flights.length;
    if (startIndex < endIndex) {
      this.flightsCurrent = this.flights.slice(startIndex, endIndex);
    } else {
      this.flightsCurrent = this.flights
        .slice(startIndex)
        .concat(this.flights.slice(0, endIndex));
    }
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
