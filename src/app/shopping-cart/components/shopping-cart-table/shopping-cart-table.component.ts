import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderStateService } from 'src/app/core/services/header-state.service';
import { UserReservation } from 'src/app/models/flyght-data.model';
import { addPassengers, selectFlight } from 'src/app/redux/actions';
import { StoreType } from 'src/app/redux/store.model';
import { RequestService } from 'src/app/services/http-request.service';
import { PassangerDataService } from 'src/app/services/passanger-data.service';

interface CartItem {
  Flight: string;
  No: string;
  FlightDestination: string;
  'Date & Time': {};
  Passengers: string;
  Price: number;
  edit: string;
  payed?: false;
}

@Component({
  selector: 'app-shopping-cart-table',
  templateUrl: './shopping-cart-table.component.html',
  styleUrls: ['./shopping-cart-table.component.css'],
})
export class ShoppingCartTableComponent {
  cartContent: CartItem[] = [];
  isUserMode = false;
  id = '';
  reservations!: UserReservation[];
  totalPrice: number = 0;
  itemsSelected!: UserReservation[];
  constructor(
    private route: ActivatedRoute,
    private request: RequestService,
    private passangerData: PassangerDataService,
    private router: Router,
    private store: Store<StoreType>,
    public state: HeaderStateService
  ) {
    this.route.params.subscribe(({ userId, mode }) => {
      this.id = userId;
      this.isUserMode = mode === 'user' ? true : false;
      this.totalPrice = 0;
      this.readReservations();
    });
  }

  private readReservations() {
    this.reservations = [];
    this.request.getUserReservations(Number(this.id)).subscribe((res) => {
      this.reservations = res.filter(
        (reserv) => this.isUserMode || !reserv.payed
      );
      this.fillTableFromUserReservations();
    });
  }

  displayedColumns: string[] = [
    'select',
    'No',
    'FlightDestination',
    'Flight',
    'Date & Time',
    'Passengers',
    'Price',
    'edit',
  ];
  dataSource = new MatTableDataSource<CartItem>(this.cartContent);
  selection = new SelectionModel<CartItem>(true, []);

  private fillTableFromUserReservations() {
    this.cartContent = [];
    this.reservations.forEach((res) => {
      let passengers = '';
      let passengCount = 0;
      if (res.passeng.passengers) {
        for (const [name, arr] of Object.entries(res.passeng.passengers)) {
          if (arr.length) {
            passengers += `${arr.length} x ${name}\n `;
            passengCount += arr.length;
          }
        }
      }

      const flightType = res.flights.backWay ? 'Round Trip' : 'One way';

      const price =
        (res.flights.oneWay!.cost! + (res.flights.backWay?.cost || 0)) *
        passengCount;
      this.totalPrice += price;

      const flightDestination = `${res.flights.oneWay!.from} - ${
        res.flights.oneWay!.to
      }\n ${
        res.flights.backWay
          ? res.flights.backWay.from + '-' + res.flights.backWay.to
          : ''
      }`;
      const cartObj = {
        No: res.flights.oneWay?.id!,
        FlightDestination: flightDestination,
        Flight: flightType,
        'Date & Time': {
          to: {
            start: res.flights.oneWay?.date,
            end: res.flights.oneWay?.dateArriv,
          },
          back: res.flights.backWay && {
            start: res.flights.backWay?.date,
            end: res.flights.backWay?.dateArriv,
          },
        },
        Passengers: passengers,
        Price: price,
        edit: '',
      };
      this.cartContent.push(cartObj);
    });
    this.dataSource.data = this.cartContent;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  onDelete(ind: number) {
    this.request.deleteReservation(Number(this.id), ind).subscribe(() => {
      this.cartContent.splice(ind, 1);
      this.dataSource.data = this.cartContent;
      this.selection.clear();
    });
  }

  onEdit(index: number) {
    if (!this.reservations) return;
    const { flights, passeng } = this.reservations[index];
    this.store.dispatch(
      selectFlight({ oneWay: flights.oneWay, backWay: flights.backWay })
    );
    this.store.dispatch(addPassengers(passeng));
    this.onDelete(index);
    this.router.navigate(['/booking/detail']);
  }

  onSummaryCheck(index: number) {
    if (!this.isUserMode) {
      return;
    }
    const summaryObj = this.reservations[index];
    this.store.dispatch(addPassengers(summaryObj.passeng));
    this.store.dispatch(selectFlight(summaryObj.flights));
    this.passangerData.enteringSummaryView = true;
    this.router.navigate(['/booking/summary']);
  }

  onreturnItemsLenght() {
    return this.selection.selected.length;
  }

  onAddnewTrip() {
    this.router.navigate(['/']);
  }

  onPayment() {
    if (!this.itemsSelected.length) return;
    this.itemsSelected.forEach((item) => {
      const index = this.reservations.indexOf(item);
      item.payed = true;
      this.request
        .editReservation(Number(this.id), index, item)
        .subscribe(() => {
          this.cartContent.splice(index, 1);
          this.dataSource.data = this.cartContent;
          this.selection.clear();
        });
    });
  }

  checkboxLabel(row?: CartItem): string {
    this.itemsSelected = this.selection.selected.map(
      (e) => this.reservations[this.cartContent.indexOf(e)]
    );

    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.No + 1
    }`;
  }
}
