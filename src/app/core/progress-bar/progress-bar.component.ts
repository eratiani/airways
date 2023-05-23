import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreakpointObserveService } from 'src/app/services/breakpoints-observer.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent {
  show = false;
  index?: number;
  constructor(
    private router: Router,
    public observer: BreakpointObserveService
  ) {
    router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.show = ev.url !== '/';
        switch (ev.url) {
          case '/booking':
            this.index = 0;
            break;
          case '/booking/detail':
            this.index = 1;
            break;
          case '/booking/summary':
            this.index = 2;
            break;
          default:
            break;
        }
      }
    });
  }
}
