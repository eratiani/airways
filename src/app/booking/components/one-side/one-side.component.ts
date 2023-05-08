import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FlightDataType } from 'src/app/models/flyght-data.model';
import { OneSideStateService } from '../../services/one-side-state.service';
import { HeaderStateService } from 'src/app/core/services/header-state.service';
// import { Subscription } from 'rxjs';

export type SideType = 'one-way' | 'back';

@Component({
  selector: 'one-side',
  styleUrls: ['./one-side.component.css'],
  templateUrl: './one-side.component.html',
  providers: [OneSideStateService],
})
export class OneSideComponent implements OnInit, OnDestroy {
  @Input() type!: SideType;
  @Input() flights: FlightDataType[] = [];
  flightCurrent: FlightDataType[] = [];
  @Output() storeSelect = new EventEmitter<FlightDataType>();
  currencyFormat: string = 'USD';
  selectedCard?: FlightDataType;
  flightIndex: number = 0;
  tempFligh: FlightDataType[] = [];
  // currencySub!: Subscription;
  constructor(
    public state: OneSideStateService,
    public headerState: HeaderStateService
  ) {}

  ngOnInit(): void {
    this.tempFligh = [...this.flights];
    this.flightCurrent = this.tempFligh.slice(0, 5);
    //  this.currencySub = this.headerState.currencyFormatEmitter.subscribe(
    //     (currency) => (this.currencyFormat = currency)
    //   );
  }
  ngOnDestroy(): void {
    // this.currencySub.unsubscribe();
  }

  selectCard(flightCard: HTMLDivElement, flight: FlightDataType) {
    // remove 'moveElement' from all cards
    Array.from(flightCard.parentElement?.children || []).forEach((elem) => {
      elem.classList.remove('moveElement');
    });
    flightCard.classList.add('moveElement');
    this.selectedCard = flight;
  }
  moveRIght() {
    if (this.tempFligh.length <= 5) return;
    if (this.flightIndex >= this.tempFligh.length - 5) {
      this.flightIndex = -1;
    }
    this.flightIndex++;
    this.flightCurrent = this.tempFligh.slice(
      this.flightIndex,
      this.flightIndex + 5
    );
  }
  moveLeft() {
    if (this.tempFligh.length <= 5) return;
    if (this.flightIndex === 0) {
      this.flightIndex = this.tempFligh.length - 4;
    }
    this.flightIndex--;
    this.flightCurrent = this.tempFligh.slice(
      this.flightIndex,
      this.flightIndex + 5
    );
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
