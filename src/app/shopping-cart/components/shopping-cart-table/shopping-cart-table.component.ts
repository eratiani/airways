import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderStateService } from 'src/app/core/services/header-state.service';
import { UserReservation } from 'src/app/models/flyght-data.model';
import { addPassengers, selectFlight } from 'src/app/redux/actions';
import { StoreType } from 'src/app/redux/store.model';
import { BackendUserService } from 'src/app/services/backend-user.service';
import { RequestService } from 'src/app/services/http-request.service';
// import { PassangerDataService } from 'src/app/services/passanger-data.service';

export interface CartItem {
  Flight: string;
  No: string;
  FlightDestination: string;
  'Date & Time': string;
  Passengers: string;
  Price: number;
  edit: string;
}

@Component({
  selector: 'app-shopping-cart-table',
  templateUrl: './shopping-cart-table.component.html',
  styleUrls: ['./shopping-cart-table.component.css'],
})
export class ShoppingCartTableComponent implements OnDestroy, OnInit {
  cartContent: CartItem[] = [];
  isUserMode = false;
  id = '';
  reservations?: UserReservation[];
  totalPrice: number = 0;
  constructor(
    private route: ActivatedRoute,
    private request: RequestService,
    private userService: BackendUserService,
    // private passangerData: PassangerDataService,
    private router: Router,
    private store: Store<StoreType>,
    public state: HeaderStateService
  ) {
    this.route.params.subscribe(({ userId, mode }) => {
      this.id = userId;
      console.log(userId);

      this.isUserMode = mode === 'user' ? true : false;
    });
    this.request.getUserReservations(Number(this.id)).subscribe((res) => {
      this.reservations = res;
      console.log(this.reservations);

      res.forEach((res) => {
        const { child = [], adult = [], infant = [] } = res.passeng.passengers!;
        const totalPass: string = String(
          child.length + adult.length + infant.length
        );
        const flightType = res.flights.backWay ? 'Round Trip' : 'One way';
        let flightDestination: string | string[] = '';
        if (!res.flights.oneWay) return;
        const price = res.flights.oneWay.cost;
        const reservationPrice =
          price * child.length + price * adult.length + price * infant.length;
        this.totalPrice += reservationPrice;
        if (res.flights.backWay) {
          this.totalPrice +=
            price * child.length + price * adult.length + price * infant.length;
          flightDestination = `${res.flights.oneWay.from} - ${res.flights.oneWay.to}
${res.flights.backWay.from} - ${res.flights.backWay.to}`;
        } else {
          flightDestination = `${res.flights.oneWay.from} - ${res.flights.oneWay.to}`;
        }
        const cartObj = {
          No: res.flights.oneWay?.id,
          FlightDestination: flightDestination,
          Flight: flightType,
          'Date & Time': res.flights.oneWay?.date,
          Passengers: totalPass,
          Price: reservationPrice,
          edit: '',
        };
        this.cartContent.push(cartObj);
      });
      this.dataSource.data = this.cartContent;
    });
  }

  ngOnDestroy(): void {
    // this.cartContent = [];  // why you did it?..
  }
  ngOnInit(): void {} // don't need ngOnInit without any Input params...

  displayedColumns: string[] = [
    'select',
    'No',
    'Flight',
    'FlightDestination',
    'Date & Time',
    'Passengers',
    'Price',
    'edit',
  ];
  dataSource = new MatTableDataSource<CartItem>(this.cartContent);
  selection = new SelectionModel<CartItem>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  onDelete(ind: number) {
    this.request.deleteReservation(4, ind).subscribe(() => {
      this.cartContent.splice(ind, 1);
      this.dataSource.data = this.cartContent;
      this.selection.clear(); // ??? it's cleared all selections!
    });
  }
  onEdit(index: number) {
    if (!this.reservations) return;
    const { flights, passeng } = this.reservations[index];
    this.store.dispatch(
      selectFlight({ oneWay: flights.oneWay, backWay: flights.backWay })
    );
    this.store.dispatch(addPassengers(passeng));

    // this.passangerData.index = index;
    // const editItemData = this.reservations[index];
    // (this.userService.searchParams = {
    //   oneWay: !!editItemData.flights.backWay,
    //   from: '',
    //   to: '',
    //   date: {
    //     startDate: '',
    //     endDate: '',
    //   },
    //   passengers: {
    //     adult: editItemData.passeng.passengers.adult?.length as number,
    //     child: editItemData.passeng.passengers.child?.length as number,
    //     infant: editItemData.passeng.passengers.infant?.length as number,
    //   },
    // }),
    //   (this.passangerData.passangerData = editItemData);
    // this.passangerData.isEditMode = true;
    // this.store.dispatch(selectFlight(editItemData.flights));
    this.onDelete(index);
    this.router.navigate(['/booking/detail']);
  }
  items = ['delete', 'edit'];
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CartItem): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.No + 1
    }`;
  }
}
