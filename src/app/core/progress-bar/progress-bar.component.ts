import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent {
  userOnBookingPage!: boolean;
  userOnPassangersPage!: boolean;
  userOnSummaryPage!: boolean;
  userOnShoppingCartPage!: boolean;
  constructor(private router: Router) {
    router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.userOnBookingPage = ev.url === '/booking';
        this.userOnPassangersPage = ev.url.includes('detail');
        this.userOnSummaryPage = ev.url.includes('summary');
        this.userOnShoppingCartPage = false; // set dependly of url
      }
    });
  }
}
