import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { HeaderStateService } from 'src/app/core/services/header-state.service';
import { BackendUserService } from 'src/app/services/backend-user.service';
import { SnackBarService } from 'src/app/services/snack-bar.srvice';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private preSelectData = {
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    password: 'myPassword',
    gender: 'male',
    dateOfBirth: '1990-01-01',
    country: {
      name: 'Germany',
      alpha2Code: 'DE',
      alpha3Code: 'DEU',
      numericCode: '276',
    },
    termsAndServices: true,
  };
  registerForm!: FormGroup<{
    username: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    gender: FormControl<string>;
    dateOfBirth: FormControl<string>;
    country: FormControl<{
      name: string;
      alpha2Code: string;
      alpha3Code: string;
      numericCode: string;
    }>;
    termsAndServices: FormControl<boolean>;
  }>;
  fieldRequired: string = 'This field is required';
  constructor(
    private auth: BackendUserService,
    private headerState: HeaderStateService,
    private snackBar: SnackBarService
  ) {}

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
  setGender(gender: string) {
    this.registerForm.get('gender')?.setValue(gender);
  }
  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    const { termsAndServices, dateOfBirth, country, ...other } =
      this.registerForm.value;
    const age =
      new Date().getFullYear() - new Date(dateOfBirth!).getFullYear() + 1;

    this.auth.registerUser({ ...other, age }).subscribe((test) => {
      console.log(test);
      this.snackBar.open('You are register successfully!');
      this.registerForm.reset();
      this.headerState.showAuth = false;
    });
  }
  onGoogleFbSignIn() {
    this.registerForm.patchValue({
      username: this.preSelectData.username,
      email: this.preSelectData.email,
      password: this.preSelectData.password,
      gender: this.preSelectData.gender,
      dateOfBirth: this.preSelectData.dateOfBirth,
      country: this.preSelectData.country,
      termsAndServices: this.preSelectData.termsAndServices,
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
