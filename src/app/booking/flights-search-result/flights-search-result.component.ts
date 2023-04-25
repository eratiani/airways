import { Component } from '@angular/core';

@Component({
  selector: 'app-flights-search-result',
  templateUrl: './flights-search-result.component.html',
  styleUrls: ['./flights-search-result.component.css']
})
export class FlightsSearchResultComponent {
 mockFlights  = [
  { date: 1, day: "Wednesday", price: "4.5$" },
  { date: 2, day: "Thursday", price: "4.5$" },
  { date: 3, day: "Friday", price: "4.5$" },
  { date: 4, day: "Saturday", price: "4.5$" },
  { date: 5, day: "Sunday", price: "4.5$" },
  { date: 6, day: "Monday", price: "4.5$" },
  { date: 7, day: "Tuesday", price: "4.5$" },
  { date: 8, day: "Wednesday", price: "4.5$" },
  { date: 9, day: "Thursday", price: "4.5$" },
  { date: 0, day: "Friday", price: "4.5$" }
]
}
