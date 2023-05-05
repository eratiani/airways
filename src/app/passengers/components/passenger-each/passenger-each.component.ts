import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'passenger-each',
  templateUrl: './passenger-each.component.html',
  styleUrls: ['./passenger-each.component.css'],
})
export class PassengerEachComponent implements OnInit {
  @Input() control!: FormGroup;
  @Input() count!: number;

  fieldRequired: string = 'This field is required';
  ngOnInit(): void {
    console.log(this.control.controls);
    // this.control.controls
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
}
