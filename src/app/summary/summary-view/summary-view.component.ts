import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreType } from 'src/app/redux/store.model';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.css'],
})
export class SummaryViewComponent implements OnInit {
  passangersInfo: any;
  constructor(private store: Store<StoreType>) {}
  ngOnInit(): void {
    this.store
      .select('reservations')
      .subscribe((data) => (this.passangersInfo = data));
    console.log(this.passangersInfo);
  }
}
