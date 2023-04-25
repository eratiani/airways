import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BackendUserService } from 'src/app/shared/services/backend-user.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  logInForm!: FormGroup;
  fieldRequired: string = 'This field is required';
  token: { token: string } = { token: '' };
  constructor(
    private userService: BackendUserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.logInForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        this.checkPassword,
      ]),
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
  async onSubmit(formData: FormGroup, formDirective: FormGroupDirective) {
    try {
      const password = formData.value.password;
      const username = formData.value.username;
      const user = {
        login: username,
        password: password,
      };
      const result = await this.userService.loginUser(user);

      this.token = result as { token: string };
      this.router.navigateByUrl('/Home');
      formDirective.resetForm();
      this.logInForm.reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // this.errorService.generateError(err);
    }

    //  this.auth.registerUSer(email, password, username);
  }
}
