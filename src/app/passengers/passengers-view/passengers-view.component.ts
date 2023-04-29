import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderStateService } from 'src/app/core/services/header-state.service';

@Component({
  selector: 'app-passengers-view',
  templateUrl: './passengers-view.component.html',
  styleUrls: ['./passengers-view.component.css'],
})
export class PassengersViewComponent implements OnInit, OnDestroy {
  constructor(private headerState: HeaderStateService) {}
  ngOnInit(): void {
    this.headerState.toggleUserOnPassengersPage();
  }
  ngOnDestroy(): void {
    this.headerState.toggleUserOnPassengersPage();
  }
}
