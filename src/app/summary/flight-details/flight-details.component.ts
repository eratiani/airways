import { Component, Input, OnInit } from '@angular/core';
import { FlightDataType } from 'src/app/models/flyght-data.model';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css'],
})
export class FlightDetailsComponent implements OnInit {
  @Input() flightDetails?: any;
  @Input() oneWayFlight?: FlightDataType;
  @Input() backFlight?: FlightDataType;

  ngOnInit(): void {
    console.log(this.backFlight);
  }
}
