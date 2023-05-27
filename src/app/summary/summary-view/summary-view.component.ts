import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import {
  FlightDataType,
  ReservationDataType,
} from 'src/app/models/flyght-data.model';
import { StoreType } from 'src/app/redux/store.model';
import { BackendUserService } from 'src/app/services/backend-user.service';
import { RequestService } from 'src/app/services/http-request.service';
import { PassangerDataService } from 'src/app/services/passanger-data.service';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.css'],
})
export class SummaryViewComponent {
  passangersInfo!: ReservationDataType;
  oneWayFlight?: FlightDataType;
  backFlight?: FlightDataType;
  FromCartPage: boolean = false;
  constructor(
    private store: Store<StoreType>,
    private router: Router,
    private request: RequestService,
    private userAuth: BackendUserService,
    private passengersData: PassangerDataService
  ) {
    this.FromCartPage = this.passengersData.enteringSummaryView;
    this.store
      .select('reservation')
      .subscribe((data) => (this.passangersInfo = data));
    console.log('passengers', this.passangersInfo);
    this.store.select('selectedFlight', 'oneWay').subscribe((data) => {
      console.log('oneway data', data);
      this.oneWayFlight = data;
    });
    this.store.select('selectedFlight', 'backWay').subscribe((data) => {
      this.backFlight = data;
    });
  }

  goBack() {
    this.router.navigateByUrl('booking/detail');
  }

  toUserPage() {
    this.router.navigate(['cart', this.userAuth.userLocal.id, 'user']);
  }

  goToCart() {
    if (this.passengersData.isEditMode) {
      this.request
        .editReservation(
          this.userAuth.userLocal.id!,
          this.passengersData.index,
          {
            flights: { oneWay: this.oneWayFlight, backWay: this.backFlight },
            passeng: this.passangersInfo,
          }
        )
        .subscribe((res) => {
          console.log(res);
          this.router.navigate([
            'cart',
            this.userAuth.userLocal.id,
            'shopping',
          ]);
        });
      return;
    }
    this.request
      .addReservation(this.userAuth.userLocal.id!, {
        flights: { oneWay: this.oneWayFlight, backWay: this.backFlight },
        passeng: this.passangersInfo,
      })
      .subscribe((res) =>
        this.router.navigate(['cart', this.userAuth.userLocal.id, 'shopping'])
      );
  }
}
