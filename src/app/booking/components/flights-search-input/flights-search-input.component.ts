import { Component } from '@angular/core';
import { HeaderStateService } from 'src/app/core/services/header-state.service';
import { BackendUserService } from 'src/app/services/backend-user.service';

@Component({
  selector: 'app-flights-search-input',
  templateUrl: './flights-search-input.component.html',
  styleUrls: ['./flights-search-input.component.css'],
})
export class FlightsSearchInputComponent {
  showEdit = false;
  changeEditVIew() {
    this.showEdit = !this.showEdit;
  }
  constructor(
    public userState: BackendUserService,
    public headState: HeaderStateService
  ) {}
}
