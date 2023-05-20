import { Component } from '@angular/core';
import { SearchParamsType } from 'src/app/models/flyght-data.model';
import { BackendUserService } from 'src/app/services/backend-user.service';

@Component({
  selector: 'app-flights-search-input',
  templateUrl: './flights-search-input.component.html',
  styleUrls: ['./flights-search-input.component.css'],
})
export class FlightsSearchInputComponent {
  showEdit = true; // change to false!
  changeEditVIew() {
    this.showEdit = !this.showEdit;
  }
  constructor(public userState: BackendUserService) {}
}
