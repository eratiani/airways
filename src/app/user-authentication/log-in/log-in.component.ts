import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderStateService } from 'src/app/core/services/header-state.service';
import { BackendUserService } from 'src/app/services/backend-user.service';
import { SnackBarService } from 'src/app/services/snack-bar.srvice';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  private preSelectData = {
    email: 'johndoe@example.com',
    password: 'myPassword',
  };
  logInForm!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;
  fieldRequired: string = 'This field is required';
  constructor(
    private userService: BackendUserService,
    private headerState: HeaderStateService,
    private snackBar: SnackBarService
  ) {}

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.logInForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.pattern(emailregex)],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required, this.checkPassword],
        nonNullable: true,
      }),
    });
  }
  emaiErrors() {
    return this.logInForm.get('email')?.hasError('required')
      ? 'This field is required'
      : this.logInForm.get('email')?.hasError('pattern')
      ? 'Not a valid emailaddress'
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
    return this.logInForm.get('password')?.hasError('required')
      ? 'This field is required (The password must be at least six characters, one uppercase letter and one number)'
      : this.logInForm.get('password')?.hasError('requirements')
      ? 'Password needs to be at least six characters, one uppercase letter and one number'
      : '';
  }
  checkValidation(input: string) {
    const validation =
      this.logInForm.get(input)?.invalid &&
      (this.logInForm.get(input)?.dirty || this.logInForm.get(input)?.touched);
    return validation;
  }
  onGoogleFbSignIn() {
    this.logInForm.patchValue({
      email: this.preSelectData.email,
      password: this.preSelectData.password,
    });
  }
  async onSubmit() {
    try {
      const { password, email } = this.logInForm.value;
      this.userService.loginUser(email!, password!).subscribe((test) => {
        console.log(test);
        this.snackBar.open('You are login successfully!');
        this.logInForm.reset();
        this.headerState.showAuth = false;
      });
    } catch (err: any) {
      // this.errorService.generateError(err);
    }
  }
}
