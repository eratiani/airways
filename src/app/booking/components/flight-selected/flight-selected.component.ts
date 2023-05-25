import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderStateService } from 'src/app/core/services/header-state.service';
import { FlightDataType } from 'src/app/models/flyght-data.model';
import { timeOfFlight } from 'src/app/services/time-of-flight';

@Component({
  selector: 'app-flight-selected',
  templateUrl: './flight-selected.component.html',
  styleUrls: ['./flight-selected.component.css'],
})
export class FlightSelectedComponent {
  @Input() flight!: FlightDataType;
  @Input() selected!: boolean;
  @Output() changeEv = new EventEmitter<boolean>();

  timeOfFlight = timeOfFlight;

  constructor(public state: HeaderStateService) {}

  handleSelect() {
    this.changeEv.emit(!this.selected);
  }
}
