import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ContactType } from '../../passengers-view/passengers-view.component';
import { PassangerDataService } from 'src/app/services/passanger-data.service';

@Component({
  selector: 'app-passenger-contact-info',
  templateUrl: './passenger-contact-info.component.html',
  styleUrls: ['./passenger-contact-info.component.css'],
})
export class PassengerContactInfoComponent {
  @Input() control!: FormGroup<Partial<ContactType>>;
  fieldRequired: string = 'This field is required';
  phoneNumber: string = '';
constructor(private passangerData: PassangerDataService){}
  ngOnInit(): void {
    const emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.control.addControl(
      'email',
      new FormControl('', {
        validators: [Validators.required, Validators.pattern(emailregex)],
        nonNullable: true,
      })
    );
    this.control.addControl(
      'country',
      new FormControl(
        {
          name: '',
          alpha2Code: '',
          alpha3Code: '',
          numericCode: '',
        },
        {
          validators: Validators.required,
          nonNullable: true,
        }
      )
    );
    this.control.addControl(
      'telephone',
      new FormControl('', {
        validators: [Validators.required, this.phoneNumberValidator()],
        nonNullable: true,
      })
    );
 if (this.passangerData.isEditMode ) {
  this.phoneNumber = this.passangerData.passangerData.passeng.contact.country?.callingCode as string
  this.control.get("email")?.setValue(this.passangerData.passangerData.passeng.contact.email)
  this.control.get("country")?.setValue(this.passangerData.passangerData.passeng.contact.country)
  this.control.get("telephone")?.setValue(this.passangerData.passangerData.passeng.contact.telephone)
 }
  }

  emaiErrors() {
    return this.control.get('email')?.hasError('required')
      ? 'This field is required'
      : this.control.get('email')?.hasError('pattern')
      ? 'Not a valid emailaddress'
      : '';
  }

  phoneNumberValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const countryPhone = this.phoneNumber;
      const phoneNumberRegex = new RegExp(
        `^\\+${countryPhone}-?\\d{3}-?\\d{3}-?\\d{4}$`
      );
      const value = control.value;

      if (!value) {
        return null;
      }

      if (!phoneNumberRegex.test(value)) {
        return { phoneNumber: true };
      }

      return null;
    };
  }

  onCountrySelected(country: {
    alpha2Code: string;
    alpha3Code: string;
    callingCode: string;
    name: string;
    numericCode: string;
  }) {
    this.phoneNumber = country.callingCode;
    if (this.control.controls.telephone) {
      this.control.controls.telephone.setValue(`${this.phoneNumber}-`);
    }
  }

  phoneErrors() {
    return this.control.get('telephone')?.hasError('required')
      ? 'This field is required'
      : this.control.get('telephone')?.hasError('phoneNumber')
      ? ` ${this.phoneNumber}-***-***-****`
      : '';
  }
  onTelephoneKeydown(event: KeyboardEvent) {
    const allowedKeys = ['-', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];

    if (!allowedKeys.includes(event.key) && isNaN(Number(event.key))) {
      event.preventDefault();
    }
  }
  checkValidation(input: string) {
    const validation =
      this.control.get(input)?.invalid &&
      (this.control.get(input)?.dirty || this.control.get(input)?.touched);
    return validation;
  }
}
