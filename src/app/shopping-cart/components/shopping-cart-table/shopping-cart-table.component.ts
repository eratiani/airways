import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { UserReservation } from 'src/app/models/flyght-data.model';
import { RequestService } from 'src/app/services/http-request.service';

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
  constructor(
    private route: ActivatedRoute,
    private request: RequestService,
    private changeDetectorRef: ChangeDetectorRef
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
        const { child = [], adult = [], infant = [] } = res.passeng.passengers;
        const totalPass: any = child.length + adult.length + infant.length;
        const flightType = res.flights.backWay ? 'Round Trip' : 'One way';
        let flightDestination: string | string[] = '';
        if (!res.flights.oneWay) return;
        if (res.flights.backWay) {
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
          Price: res.flights.oneWay?.cost,
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
    // can't use "any" type !!!!!!!!!!!!!!!

    this.request.deleteReservation(4, ind).subscribe(() => {
      // const index = this.cartContent.indexOf(e);
      //     if (index > -1) {
      this.cartContent.splice(ind, 1);
      this.dataSource.data = this.cartContent;
      this.selection.clear(); // ??? it's cleared all selections!
      // }
    });
  }
  onEdit(ind: number) {
    // can't use "any" type !!!!!!!!!!!!!!!

    // const index = this.cartContent.indexOf(e);
    const editItemData = this.cartContent[ind];
    console.log(editItemData);
  }
  items = ['delete', 'edit'];
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CartItem): string {
    // console.log(row);

    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.No + 1
    }`;
  }
}
