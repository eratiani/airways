import { Component } from '@angular/core';

@Component({
  selector: 'app-flight-fare',
  templateUrl: './flight-fare.component.html',
  styleUrls: ['./flight-fare.component.css']
})
export class FlightFareComponent {
  flightPrices = [
    {
      passengerType: 'Adult',
      ticketType: 'Fare',
      ticketPrice: 166.00,
      taxAndServiceCharge: 91.31,
      totalPrice: 257.31
    },
    {
      passengerType: 'Child',
      ticketType: 'Fare',
      ticketPrice: 106.00,
      taxAndServiceCharge: 90.08,
      totalPrice: 196.08
    },
    {
      passengerType: 'Infant',
      ticketType: 'Fare',
      ticketPrice: 88.00,
      taxAndServiceCharge: 10.00,
      totalPrice: 98.00
    },
  ]
}
