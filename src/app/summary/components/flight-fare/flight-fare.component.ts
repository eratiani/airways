import { Component, Input, OnInit } from '@angular/core';
import { HeaderStateService } from 'src/app/core/services/header-state.service';
import { FlightDataType, ReservationDataType } from 'src/app/models/flyght-data.model';

@Component({
  selector: 'app-flight-fare',
  templateUrl: './flight-fare.component.html',
  styleUrls: ['./flight-fare.component.css'],
})
export class FlightFareComponent {
  @Input() oneWayFlight?: FlightDataType;
  @Input() backFlight?: FlightDataType;
  @Input() flightDetails!: ReservationDataType;
  constructor(public state: HeaderStateService) {}

  totalPrice() {
    if (!this.oneWayFlight) return;
    let priceSum = 0;

    const prices = document.querySelectorAll('.price__Ticket').forEach((e) => {
      if (e.textContent) {
        priceSum += Number(e.textContent.replace(/\D/g, '')) / 100;
      }
    });
    return priceSum;
  }
  getObjectKeys(obj: any):[string, any][] {
    return Object.entries(obj);
  }
}
