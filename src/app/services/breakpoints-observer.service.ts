import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BreakpointObserveService {
  max1100 = false;
  max720 = false;
  max600 = false;
  constructor(private brpObserver: BreakpointObserver) {
    brpObserver
      .observe([
        '(max-width: 1100px)',
        '(max-width: 720px)',
        '(max-width: 600px)',
      ])
      .subscribe(({ breakpoints }) => {
        this.max1100 = breakpoints['(max-width: 1100px)'];
        this.max720 = breakpoints['(max-width: 720px)'];
        this.max600 = breakpoints['(max-width: 600px)'];
      });
  }
}
