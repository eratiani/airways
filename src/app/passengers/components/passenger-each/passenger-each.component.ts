import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HeaderStateService } from 'src/app/core/services/header-state.service';
import { EachPassengerType } from '../../passengers-view/passengers-view.component';

@Component({
  selector: 'passenger-each',
  templateUrl: './passenger-each.component.html',
  styleUrls: ['./passenger-each.component.css'],
})
export class PassengerEachComponent {
  @Input() control!: FormGroup<EachPassengerType>;
  @Input() count!: number;

  fieldRequired: string = 'This field is required';
  constructor(public headerState: HeaderStateService) {}

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
    return this.control.get(name)?.hasError;
  }
}
