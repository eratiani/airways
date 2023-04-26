import { Component } from '@angular/core';
import { HeaderStateService } from 'src/app/core/services/header-state.service';

@Component({
  selector: 'app-content-main',
  templateUrl: './content-main.component.html',
  styleUrls: ['./content-main.component.css'],
})
export class ContentMainComponent {
  constructor(public headerState: HeaderStateService) {}
  signedIn: boolean = false;
  onSignIn(event: boolean) {
    this.signedIn = event;
  }
}
