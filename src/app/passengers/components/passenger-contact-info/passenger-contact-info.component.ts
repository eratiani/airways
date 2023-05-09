import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-passenger-contact-info',
  templateUrl: './passenger-contact-info.component.html',
  styleUrls: ['./passenger-contact-info.component.css'],
})
export class PassengerContactInfoComponent {
  @Input() control!: FormGroup;
  fieldRequired: string = 'This field is required';
  phoneNumber:string = '';
  ngOnInit(): void {
   
    this.control = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      country: new FormControl(
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
      ),
      telephone: new FormControl('', {
        validators: [Validators.required, this.phoneNumberValidator()],
        nonNullable: true,
      }),
    });
  }

  emaiErrors() {
    return this.control.get('email')?.hasError('required')
      ? 'This field is required'
      : this.control.get('email')?.hasError('email')
      ? 'Not a valid emailaddress'
      : '';
  }
  phoneNumberValidator() {
    
    return (control: AbstractControl): { [key: string]: any } | null => {
      const countryPhone = this.phoneNumber;
      const phoneNumberRegex = new RegExp(`^\\+${countryPhone}-\\d{3}-\\d{3}-\\d{4}$`);
      const value = control.value;
      console.log(value);
      
      if (!value) {
        return null;
      }
  
      if (!phoneNumberRegex.test(value)) {
        return { phoneNumber: true };
      }
  
      return null;
    };
}

onCountrySelected(country:{alpha2Code:string, alpha3Code:string,    callingCode:string,    name:string,    numericCode:string
  }){
    this.phoneNumber = country.callingCode;
    this.control.controls['telephone'].setValue(`${this.phoneNumber}-`);
    console.log(this.phoneNumber);
}
phoneErrors() {
  return this.control.get('telephone')?.hasError('required')
    ? 'This field is required'
    : this.control.get('telephone')?.hasError('phoneNumber')
    ? `Not a valid Phone number must start with ${this.phoneNumber}`
    : '';
}
checkValidation(input: string) {
  const validation =
    this.control.get(input)?.invalid &&
    (this.control.get(input)?.dirty ||
      this.control.get(input)?.touched);
  return validation;
}
}
