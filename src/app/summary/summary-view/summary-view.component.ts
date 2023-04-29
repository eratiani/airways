import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderStateService } from 'src/app/core/services/header-state.service';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.css'],
})
export class SummaryViewComponent implements OnInit, OnDestroy {
  constructor(private headerState: HeaderStateService) {}
  ngOnInit(): void {
    this.headerState.toggleUserOnSummaryPage();
  }
  ngOnDestroy(): void {
    this.headerState.toggleUserOnSummaryPage();
  }
}
