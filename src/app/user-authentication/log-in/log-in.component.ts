import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { HeaderStateService } from 'src/app/core/services/header-state.service';
import { BackendUserService } from 'src/app/services/backend-user.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  logInForm!: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }>;
  fieldRequired: string = 'This field is required';
  constructor(
    private userService: BackendUserService,
    private headerState: HeaderStateService
  ) {}

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.logInForm = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required],
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
  async onSubmit() {
    try {
      const { password, username } = this.logInForm.value;
      this.userService.loginUser(username!, password!).subscribe((test) => {
        console.log(test);
        this.logInForm.reset();
        this.headerState.showAuth = false;
      });
    } catch (err: any) {
      // this.errorService.generateError(err);
    }
  }
}
