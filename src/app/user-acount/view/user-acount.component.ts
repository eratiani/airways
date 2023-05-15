import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-acount',
  templateUrl: './user-acount.component.html',
})
export class UserAcoutComponent {
  id = '';
  constructor(private route: ActivatedRoute) {
    route.params.subscribe(({ userId }) => {
      this.id = userId;
    });
  }
}
