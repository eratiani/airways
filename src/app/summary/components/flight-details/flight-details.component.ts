import { Component, Input } from '@angular/core';
import { HeaderStateService } from 'src/app/core/services/header-state.service';
import { FlightDataType } from 'src/app/models/flyght-data.model';
import { ReservationDataType } from 'src/app/models/flyght-data.model';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css'],
})
export class FlightDetailsComponent {
  @Input() flightDetails!: ReservationDataType;
  @Input() oneWayFlight?: FlightDataType;
  @Input() backFlight?: FlightDataType;

  constructor(public state: HeaderStateService) {}

  getObjectKeys(obj: any): [string, any][] {
    return Object.entries(obj);
  }
}
