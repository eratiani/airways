import { Component, Input, OnInit } from '@angular/core';
import { FlightDataType, ReservationDataType } from 'src/app/models/flyght-data.model';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css'],
})
export class FlightDetailsComponent implements OnInit {
  @Input() flightDetails!: any ;
  @Input() oneWayFlight?: FlightDataType;
  @Input() backFlight?: FlightDataType;
  timeOfLanding(flightObj:FlightDataType) {
    const randomHours = Math.floor(Math.random() * 12) + 1;
    const date = new Date(flightObj.date);
    date.setHours(date.getHours() + randomHours); 
    // const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); // formats the date as "Sep 8, 2023"
    
    console.log(date,flightObj);
    
    return date;
  }
  ngOnInit(): void {
    console.log(this.flightDetails);
  }

}
