import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-passenger-contact-info',
  templateUrl: './passenger-contact-info.component.html',
  styleUrls: ['./passenger-contact-info.component.css'],
})
export class PassengerContactInfoComponent {
  @Input() control!: FormGroup;
  fieldRequired: string = 'This field is required';

  ngOnInit(): void {
    this.control.addControl(
      'email',
      new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      })
    );
  }

  emaiErrors() {
    return this.control.get('email')?.hasError('required')
      ? 'This field is required'
      : this.control.get('email')?.hasError('email')
      ? 'Not a valid emailaddress'
      : '';
  }

  checkValidation(input: string) {
    return this.control.get(input)?.invalid;
  }
}
