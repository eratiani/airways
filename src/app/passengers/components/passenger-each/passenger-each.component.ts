import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HeaderStateService } from 'src/app/core/services/header-state.service';
import { EachPassengerType } from '../../passengers-view/passengers-view.component';

@Component({
  selector: 'passenger-each',
  templateUrl: './passenger-each.component.html',
  styleUrls: ['./passenger-each.component.css'],
})
export class PassengerEachComponent  {
  @Input() control!: FormGroup<EachPassengerType>;
  @Input() count!: number;
  @Input() passType!: string;
  @ViewChild('quantityInput') quantityInput!: ElementRef<HTMLInputElement>;
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
  increment() {
    const currentValue = this.control.get("baggage")?.value;
    if (currentValue !== undefined && currentValue < 5) {
      this.control.get("baggage")?.setValue(currentValue + 1);
    }
  }
  
  decrement() {
    const currentValue = this.control.get("baggage")?.value;
    if (currentValue !== undefined && currentValue > 0) {
      this.control.get("baggage")?.setValue(currentValue - 1);
    }
  }
  checkValidation(name: string) {
    return this.control.get(name)?.hasError;
  }
}
