import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
  @Input() passType!: string;
  @ViewChild('quantityInput') quantityInput!: ElementRef<HTMLInputElement>;
  fieldRequired: string = 'This field is required';
  constructor(public headerState: HeaderStateService) {}

  nameSurnameError(input: string) {
    return this.control.get(input)?.hasError('required')
      ? 'This field is required'
      : this.control.get(input)?.hasError('patternval')
      ? ` no numbers allowed`
      : '';
  }
  dateErrors() {
    return this.control.get('dOb')?.hasError('required')
      ? 'This field is required'
      : this.control.get('dOb')?.hasError('dateNotInFuture')
      ? 'Not a valid date of birth'
      : '';
  }
  increment() {
    const currentValue = this.control.get('baggage')?.value;
    if (currentValue !== undefined && currentValue < 5) {
      this.control.get('baggage')?.setValue(currentValue + 1);
    }
  }

  decrement() {
    const currentValue = this.control.get('baggage')?.value;
    if (currentValue !== undefined && currentValue > 0) {
      this.control.get('baggage')?.setValue(currentValue - 1);
    }
  }
  checkValidation(input: string) {
    const validation =
      this.control.get(input)?.invalid &&
      (this.control.get(input)?.dirty || this.control.get(input)?.touched);
    return validation;
  }
}
