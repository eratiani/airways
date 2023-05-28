import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
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
export class SummaryViewComponent implements OnDestroy {
  passangersInfo!: ReservationDataType;
  oneWayFlight?: FlightDataType;
  backFlight?: FlightDataType;
  editMode = false;
  destroyer = new Subject<void>();
  constructor(
    private store: Store<StoreType>,
    private router: Router,
    private request: RequestService,
    private userAuth: BackendUserService,
    private route: ActivatedRoute
  ) {
    this.store
      .select('reservation')
      .pipe(takeUntil(this.destroyer))
      .subscribe((data) => (this.passangersInfo = data));
    this.store
      .select('selectedFlight', 'oneWay')
      .pipe(takeUntil(this.destroyer))
      .subscribe((data) => {
        this.oneWayFlight = data;
      });
    this.store
      .select('selectedFlight', 'backWay')
      .pipe(takeUntil(this.destroyer))
      .subscribe((data) => {
        this.backFlight = data;
      });
    route.params.pipe(takeUntil(this.destroyer)).subscribe((params) => {
      if (params['mode'] === 'edit') {
        this.editMode = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyer.next();
    this.destroyer.complete();
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
