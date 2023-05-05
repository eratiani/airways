import { Component, } from '@angular/core';
import { HeaderStateService } from '../services/header-state.service';
import { BackendUserService } from 'src/app/services/backend-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
 
  date:string = 'DD/MM/YYYY';
  currency:string = 'USD';
  constructor(
    private headState: HeaderStateService,
    public userState: BackendUserService
  ) {}
  
  onDateFormatChage() {
    this.headState.dateFormatEmiter.next(this.date)
  }
  oncurrencyFormatChage() {
    this.headState.currencyFormatEmitter.next(this.currency)
  }
 
  
  handleLog() {
    if (!this.userState.loggedIn) {
      this.headState.showAuth = true;
    } else {
      this.userState.logOut();
    }
  }
}
