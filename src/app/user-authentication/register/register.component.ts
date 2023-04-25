import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { BackendUserService } from 'src/app/services/backend-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup<{
    username: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    gender: FormControl<string>;
    dateOfBirth: FormControl<string>;
    country: FormControl<string>;
    termsAndServices: FormControl<boolean>;
  }>;
  fieldRequired: string = 'This field is required';
  constructor(private auth: BackendUserService) {}

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.registerForm = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.pattern(emailregex)],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required, this.checkPassword],
        nonNullable: true,
      }),
      dateOfBirth: new FormControl('', {
        validators: [Validators.required, this.dateNotInFutureValidator],
        nonNullable: true,
      }),
      gender: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      country: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      termsAndServices: new FormControl(false, {
        validators: [this.termsAndServicesvalidation],
        nonNullable: true,
      }),
    });
  }
  termsAndServicesvalidation(control: AbstractControl) {
    return control.value;
  }
  emaiErrors() {
    return this.registerForm.get('email')?.hasError('required')
      ? 'This field is required'
      : this.registerForm.get('email')?.hasError('pattern')
      ? 'Not a valid emailaddress'
      : '';
  }
  dateErrors() {
    return this.registerForm.get('dateOfBirth')?.hasError('required')
      ? 'This field is required'
      : this.registerForm.get('dateOfBirth')?.hasError('dateNotInFuture')
      ? 'Not a valid date of birth'
      : '';
  }
  checkPassword(control: AbstractControl) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }
  getErrorPassword() {
    return this.registerForm.get('password')?.hasError('required')
      ? 'This field is required (The password must be at least six characters, one uppercase letter and one number)'
      : this.registerForm.get('password')?.hasError('requirements')
      ? 'Password needs to be at least six characters, one uppercase letter and one number'
      : '';
  }
  checkValidation(input: string) {
    const validation =
      this.registerForm.get(input)?.invalid &&
      (this.registerForm.get(input)?.dirty ||
        this.registerForm.get(input)?.touched);
    return validation;
  }
  onSubmit(formDirective: FormGroupDirective): void {
    // const email = formData.value.email;
    // const password = formData.value.password;
    // const username = formData.value.username;
    const { email, password, username } = this.registerForm.value;
    console.log(formDirective, password);

    this.auth.registerUser(email!, password!).subscribe((test) => {
      console.log(test);
      formDirective.resetForm();
      this.registerForm.reset();
    });
  }
  dateNotInFutureValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const currentDate = new Date();

    if (inputDate > currentDate) {
      return { dateNotInFuture: true };
    }

    return null;
  }
}
