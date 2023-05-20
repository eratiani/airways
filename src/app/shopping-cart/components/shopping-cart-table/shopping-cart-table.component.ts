// import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
// import { MatSort, Sort } from '@angular/material/sort';
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

let ELEMENT_DATA:CartItem[] = [
  // {
  //   No: 10,
  //   Flight: 'Neon',
  //   FlightDestination: 20.1797,
  //   ['Date & Time']: 'smth',
  //   Passengers: 'smth',
  //   Price: 'dasdasd',
  //   edit: '',
  // },
];

@Component({
  selector: 'app-shopping-cart-table',
  templateUrl: './shopping-cart-table.component.html',
  styleUrls: ['./shopping-cart-table.component.css'],
})
export class ShoppingCartTableComponent implements OnInit {
  isUserMode = false; // should be pass dependly of mode later
  id = '';
  reservations?: UserReservation[];
ngOnInit(): void {
console.log(this.reservations);
ELEMENT_DATA = []
}
  constructor(private route: ActivatedRoute, private request: RequestService) {
    route.params.subscribe(({ userId, mode }) => {
      this.id = userId;
      console.log(userId);
      
      this.isUserMode = mode === 'user' ? true : false;
    });
    request.getUserReservations(Number(this.id)).subscribe((res) => {
      this.reservations = res;
      res.forEach(res=>{
        const {child=[], adult=[], infant=[]} = res.passeng.passengers;
        const totalPass:any= child.length +adult.length+ infant.length
        console.log(child, adult, infant, totalPass);
        const flightType = (res.flights.backWay)? "Round Trip" :"One way";
        let flightDestination:string|string[] ='';
        if(!res.flights.oneWay) return
        if ( res.flights.backWay) {
          flightDestination = `${res.flights.oneWay.from} - ${res.flights.oneWay.to}
${res.flights.backWay.from} - ${res.flights.backWay.to}`
        } else {
          flightDestination = `${res.flights.oneWay.from} + ${res.flights.oneWay.to}`
        }
        const cartObj = {
          No: res.flights.oneWay?.id,
          FlightDestination: flightDestination,
          Flight: flightType,
          'Date & Time': res.flights.oneWay?.date,
          Passengers: totalPass,
          Price: res.flights.oneWay?.cost,
          edit: "",
        }
        ELEMENT_DATA.push(cartObj)
      })
      console.log(res);
      // ELEMENT_DATA = res
      
    });
  }

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
  dataSource = new MatTableDataSource<CartItem>(ELEMENT_DATA);
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
  // onEditDelete(event: MouseEvent, element: any) {
  //   element.showButtons = !element.showButtons;
  //   event.stopPropagation();
  // }
  onDelete(e: CartItem) {}
  onEdit(e: CartItem) {}
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
