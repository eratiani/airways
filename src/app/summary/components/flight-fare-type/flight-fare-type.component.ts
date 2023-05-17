import { Component, Input, OnInit } from '@angular/core';
import { HeaderStateService } from 'src/app/core/services/header-state.service';
import { FlightDataType, ReservationDataType } from 'src/app/models/flyght-data.model';

@Component({
  selector: 'app-flight-fare-type',
  templateUrl: './flight-fare-type.component.html',
  styleUrls: ['./flight-fare-type.component.css']
})
export class FlightFareTypeComponent implements OnInit {
  @Input("passenger" ) passengerArr!: ReservationDataType[];
  @Input( ) passangerType!: string;
  @Input("flightType") oneWayFlight!: FlightDataType;
  price:number = 0
  constructor(public state: HeaderStateService){}
  ngOnInit(): void {
    this.price = this.oneWayFlight.cost * this.passengerArr.length;
  }
}
