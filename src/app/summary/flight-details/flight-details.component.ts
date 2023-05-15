import { Component, Input } from '@angular/core';
import { FlightDataType } from 'src/app/models/flyght-data.model';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css'],
})
export class FlightDetailsComponent {
  @Input() flightDetails!: any;
  @Input() oneWayFlight?: FlightDataType;
  @Input() backFlight?: FlightDataType;
  timeOfLanding(flightObj: FlightDataType) {
    const randomHours = Math.floor(Math.random() * 12) + 1;
    const date = new Date(flightObj.date);
    date.setHours(date.getHours() + randomHours);

    return date;
  }
}
