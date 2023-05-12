import { Component } from '@angular/core';
import { HeaderStateService } from './core/services/header-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'airways';
  constructor(public headerState: HeaderStateService) {}
  onHideOverlay(ev: Event) {
    if ((ev.target as HTMLElement).classList.contains('overlay'))
      this.headerState.showAuth = false;
  }
}
