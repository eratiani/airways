import { Component } from '@angular/core';

@Component({
  selector: 'app-content-main',
  templateUrl: './content-main.component.html',
  styleUrls: ['./content-main.component.css'],
})
export class ContentMainComponent {
  signedIn: boolean = false;
  onSignIn(event: boolean) {
    this.signedIn = event;
  }
}
