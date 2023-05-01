import { Component } from '@angular/core';

@Component({
  selector: 'app-flights-search-result',
  templateUrl: './flights-search-result.component.html',
  styleUrls: ['./flights-search-result.component.css'],
})
export class FlightsSearchResultComponent {
  flightSelected: boolean = false;
  returnFlightSelected: boolean = false;
  mockFlights = [
    {
      date: 1,
      day: 'Wednesday',
      price: '4.5$',
      seatsAvailable: 20,
      seatsTotal: 70,
    },
    {
      date: 2,
      day: 'Thursday',
      price: '4.5$',
      seatsAvailable: 33,
      seatsTotal: 170,
    },
    {
      date: 3,
      day: 'Friday',
      price: '4.5$',
      seatsAvailable: 10,
      seatsTotal: 20,
    },
    {
      date: 4,
      day: 'Saturday',
      price: '4.5$',
      seatsAvailable: 50,
      seatsTotal: 170,
    },
    {
      date: 5,
      day: 'Sunday',
      price: '4.5$',
      seatsAvailable: 200,
      seatsTotal: 270,
    },
    {
      date: 6,
      day: 'Monday',
      price: '4.5$',
      seatsAvailable: 5,
      seatsTotal: 30,
    },
    {
      date: 7,
      day: 'Tuesday',
      price: '4.5$',
      seatsAvailable: 7,
      seatsTotal: 10,
    },
    {
      date: 8,
      day: 'Wednesday',
      price: '4.5$',
      seatsAvailable: 22,
      seatsTotal: 40,
    },
    {
      date: 9,
      day: 'Thursday',
      price: '4.5$',
      seatsAvailable: 36,
      seatsTotal: 70,
    },
    {
      date: 0,
      day: 'Friday',
      price: '4.5$',
      seatsAvailable: 20,
      seatsTotal: 30,
    },
  ];
  onFilightSelect(event: Event) {
    this.flightSelected = true;
    const prevElementHiglighted: Element | null =
      document.querySelector('.moveElement');
    if (prevElementHiglighted)
      prevElementHiglighted.classList.remove('moveElement');
    const target = event.target as HTMLElement;

    const flightCard = target.closest('.flight-card');
    if (!flightCard) return;
    flightCard.classList.add('moveElement');
  }
  onReturnFilightSelect(event: Event) {
    this.returnFlightSelected = true;
    const prevElementHiglighted: Element | null =
      document.querySelector('.moveElement-two');
    if (prevElementHiglighted)
      prevElementHiglighted.classList.remove('moveElement-two');
    const target = event.target as HTMLElement;

    const flightCard = target.closest('.flight-card');
    if (!flightCard) return;
    flightCard.classList.add('moveElement-two');
  }
}
