import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HeaderStateService } from 'src/app/core/services/header-state.service';

@Component({
  selector: 'passenger-each',
  templateUrl: './passenger-each.component.html',
  styleUrls: ['./passenger-each.component.css'],
})
export class PassengerEachComponent implements OnInit, OnDestroy {
  @Input() control!: FormGroup;
  @Input() count!: number;
  dateFormat: string = 'DD/MM/YYYY';

  fieldRequired: string = 'This field is required';
  private subscriptions = new Subscription();
  constructor(private headerState: HeaderStateService) {}
  ngOnInit(): void {
    console.log(this.control.controls);
    // this.control.controls'
    this.subscriptions = this.headerState.dateFormatEmiter.subscribe(
      (date) => (this.dateFormat = date)
    );
  }

  emaiErrors() {
    return this.control.get('email')?.hasError('required')
      ? 'This field is required'
      : this.control.get('email')?.hasError('pattern')
      ? 'Not a valid emailaddress'
      : '';
  }

  dateErrors() {
    return this.control.get('dOb')?.hasError('required')
      ? 'This field is required'
      : this.control.get('dOb')?.hasError('dateNotInFuture')
      ? 'Not a valid date of birth'
      : '';
  }

  checkValidation(name: string) {
    const validation = this.control.get(name)?.invalid;
    //  &&
    // (this.control.get(name)?.dirty || this.control.get(name)?.touched);
    return validation;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
