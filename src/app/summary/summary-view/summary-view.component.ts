import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  FlightDataType,
  ReservationDataType,
} from 'src/app/models/flyght-data.model';
import { StoreType } from 'src/app/redux/store.model';
import { BackendUserService } from 'src/app/services/backend-user.service';
import { RequestService } from 'src/app/services/http-request.service';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.css'],
})
export class SummaryViewComponent {
  passangersInfo!: ReservationDataType;
  oneWayFlight?: FlightDataType;
  backFlight?: FlightDataType;
  editMode = false;
  constructor(
    private store: Store<StoreType>,
    private router: Router,
    private request: RequestService,
    private userAuth: BackendUserService,
    private route: ActivatedRoute
  ) {
    this.store
      .select('reservation')
      .subscribe((data) => (this.passangersInfo = data));
    this.store.select('selectedFlight', 'oneWay').subscribe((data) => {
      this.oneWayFlight = data;
    });
    this.store.select('selectedFlight', 'backWay').subscribe((data) => {
      this.backFlight = data;
    });
    route.params.subscribe((params) => {
      if (params['mode'] === 'edit') {
        this.editMode = true;
      }
    });
  }

  goBack() {
    this.router.navigateByUrl('booking/detail');
  }

  toUserPage() {
    this.router.navigate(['cart', this.userAuth.userLocal.id, 'user']);
  }

  goToCart() {
    this.request
      .addReservation(this.userAuth.userLocal.id!, {
        flights: { oneWay: this.oneWayFlight, backWay: this.backFlight },
        passeng: this.passangersInfo,
      })
      .subscribe(() =>
        this.router.navigate(['cart', this.userAuth.userLocal.id, 'shopping'])
      );
  }
}
