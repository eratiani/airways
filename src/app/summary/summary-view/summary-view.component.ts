import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SideType } from 'src/app/booking/components/one-side/one-side.component';
import { FlightDataType } from 'src/app/models/flyght-data.model';
import { StoreType } from 'src/app/redux/store.model';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.css'],
})
export class SummaryViewComponent implements OnInit {
  passangersInfo: any;
  oneWayFlight?: FlightDataType;
  backFlight?: FlightDataType;

  constructor(private store: Store<StoreType>) {}
  ngOnInit(): void {
    this.store
      .select('reservations')
      .subscribe((data) => (this.passangersInfo = data[data.length - 1]));
    console.log(this.passangersInfo);
    this.store.select('selectedFlight', 'oneWay').subscribe((data) => {
      console.log(data);
      this.oneWayFlight = data;
    });
    this.store.select('selectedFlight', 'backWay').subscribe((data) => {
      console.log(data);

      this.backFlight = data;
    });
  }
}
