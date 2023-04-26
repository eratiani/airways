import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'app-passenger-contact-info',
  templateUrl: './passenger-contact-info.component.html',
  styleUrls: ['./passenger-contact-info.component.css'],
})
export class PassengerContactInfoComponent {
  contactForm!: FormGroup<{
    email: FormControl<string>;
  }>;
  fieldRequired: string = 'This field is required';
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.contactForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.pattern(emailregex)],
        nonNullable: true,
      }),
    });
  }
  emaiErrors() {
    return this.contactForm.get('email')?.hasError('required')
      ? 'This field is required'
      : this.contactForm.get('email')?.hasError('pattern')
      ? 'Not a valid emailaddress'
      : '';
  }
  checkValidation(input: string) {
    const validation =
      this.contactForm.get(input)?.invalid &&
      (this.contactForm.get(input)?.dirty ||
        this.contactForm.get(input)?.touched);
    return validation;
  }

  onSubmit(formDirective: FormGroupDirective): void {
    console.log(formDirective);

    // const email = formData.value.email;
    // const password = formData.value.password;
    // const username = formData.value.username;
    // const { email, password, username } = this.registerForm.value;
    // console.log(formDirective, password);
    // this.auth.registerUser(email!, password!).subscribe((test) => {
    //   console.log(test);
    //   formDirective.resetForm();
    //   this.registerForm.reset();
    // });
  }
}
