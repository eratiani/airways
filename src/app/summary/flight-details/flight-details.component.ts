import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css'],
})
export class FlightDetailsComponent implements OnInit {
  @Input() flightDetails!: any;
  constructor() {
    console.log(this.flightDetails);
  }
  ngOnInit(): void {
    console.log(this.flightDetails);
  }
}
