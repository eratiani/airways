// import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
// import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { UserReservation } from 'src/app/models/flyght-data.model';
import { RequestService } from 'src/app/services/http-request.service';

export interface PeriodicElement {
  Flight: string;
  No: number;
  FlightDestination: number;
  'Date & Time': string;
  Passengers: string;
  Price: string;
  edit: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    No: 1,
    Flight: 'Dublin - Warsaw Modlin - Dublin',
    FlightDestination: 1.0079,
    ['Date & Time']: 'smth',
    Passengers: 'smth',
    Price: 'dasdasd',
    edit: '',
  },
  {
    No: 2,
    Flight: 'Helium',
    FlightDestination: 4.0026,
    ['Date & Time']: 'smth',
    Passengers: 'smth',
    Price: 'dasdasd',
    edit: '',
  },
  {
    No: 3,
    Flight: 'Lithium',
    FlightDestination: 6.941,
    ['Date & Time']: 'smth',
    Passengers: 'smth',
    Price: 'dasdasd',
    edit: '',
  },
  {
    No: 4,
    Flight: 'Beryllium',
    FlightDestination: 9.0122,
    ['Date & Time']: 'smth',
    Passengers: 'smth',
    Price: 'dasdasd',
    edit: '',
  },
  {
    No: 5,
    Flight: 'Boron',
    FlightDestination: 10.811,
    ['Date & Time']: 'smth',
    Passengers: 'smth',
    Price: 'dasdasd',
    edit: '',
  },
  {
    No: 6,
    Flight: 'Carbon',
    FlightDestination: 12.0107,
    ['Date & Time']: 'smth',
    Passengers: 'smth',
    Price: 'dasdasd',
    edit: '',
  },
  {
    No: 7,
    Flight: 'Nitrogen',
    FlightDestination: 14.0067,
    ['Date & Time']: 'smth',
    Passengers: 'smth',
    Price: 'dasdasd',
    edit: '',
  },
  {
    No: 8,
    Flight: 'Oxygen',
    FlightDestination: 15.9994,
    ['Date & Time']: 'smth',
    Passengers: 'smth',
    Price: 'dasdasd',
    edit: '',
  },
  {
    No: 9,
    Flight: 'Fluorine',
    FlightDestination: 18.9984,
    ['Date & Time']: 'smth',
    Passengers: 'smth',
    Price: 'dasdasd',
    edit: '',
  },
  {
    No: 10,
    Flight: 'Neon',
    FlightDestination: 20.1797,
    ['Date & Time']: 'smth',
    Passengers: 'smth',
    Price: 'dasdasd',
    edit: '',
  },
];

@Component({
  selector: 'app-shopping-cart-table',
  templateUrl: './shopping-cart-table.component.html',
  styleUrls: ['./shopping-cart-table.component.css'],
})
export class ShoppingCartTableComponent {
  isUserMode = false; // should be pass dependly of mode later
  id = '';
  reservations?: UserReservation[];

  constructor(private route: ActivatedRoute, private request: RequestService) {
    route.params.subscribe(({ userId, mode }) => {
      this.id = userId;
      this.isUserMode = mode === 'user' ? true : false;
    });
    request.getUserReservations(Number(this.id)).subscribe((res) => {
      this.reservations = res;
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
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

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
  onDelete(e: any) {}
  onEdit(e: any) {}
  items = ['delete', 'edit'];
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.No + 1
    }`;
  }
}
