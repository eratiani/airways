import { Component } from '@angular/core';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css'],
})
export class FlightDetailsComponent {
  flightDetails = [
    {
      flightNumber: 'FR 1925',
      route: 'Dublin — Warsaw Modlin',
      date: 'Wednesday, 1 March, 2023',
      departureTime: '8:40',
      arrivalTime: '12:00',
      passengers: [
        {
          name: 'Harry Potter',
          seat: '19E',
          luggage: [
            '1 Checked Bag (total 23 kg) per person',
            '1 Cabin Bag + 1 Personal Item (max. 8 kg) per person',
          ],
        },
        {
          name: 'lilly Potter',
          seat: '22E',
          luggage: [
            '1 Checked Bag (total 23 kg) per person',
            '1 Cabin Bag + 1 Personal Item (max. 8 kg) per person',
          ],
        },
        {
          name: 'james Potter',
          seat: '23E',
          luggage: [
            '1 Checked Bag (total 23 kg) per person',
            '1 Cabin Bag + 1 Personal Item (max. 8 kg) per person',
          ],
        },
      ],
    },
    {
      flightNumber: 'FR 1925',
      route: 'Dublin — Warsaw Modlin',
      date: 'Wednesday, 1 March, 2023',
      departureTime: '8:40',
      arrivalTime: '12:00',
      passengers: [
        {
          name: 'Harry Potter',
          seat: '19E',
          luggage: [
            '1 Checked Bag (total 23 kg) per person',
            '1 Cabin Bag + 1 Personal Item (max. 8 kg) per person',
          ],
        },
        {
          name: 'lilly Potter',
          seat: '22E',
          luggage: [
            '1 Checked Bag (total 23 kg) per person',
            '1 Cabin Bag + 1 Personal Item (max. 8 kg) per person',
          ],
        },
        {
          name: 'james Potter',
          seat: '23E',
          luggage: [
            '1 Checked Bag (total 23 kg) per person',
            '1 Cabin Bag + 1 Personal Item (max. 8 kg) per person',
          ],
        },
      ],
    },
  ];
}
