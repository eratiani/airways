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
  selector: 'app-passenger-child',
  templateUrl: './passenger-child.component.html',
  styleUrls: ['./passenger-child.component.css'],
})
export class PassengerChildComponent {
  childForm!: FormGroup<{
    name: FormControl<string>;

    surname: FormControl<string>;
    gender: FormControl<string>;
    dateOfBirth: FormControl<string>;
    specialNeeds: FormControl<boolean>;
  }>;
  fieldRequired: string = 'This field is required';
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.childForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      surname: new FormControl('', {
        validators: [Validators.required],
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
      specialNeeds: new FormControl(false, {
        validators: [],
        nonNullable: true,
      }),
    });
  }
  checkValidation(input: string) {
    const validation =
      this.childForm.get(input)?.invalid &&
      (this.childForm.get(input)?.dirty || this.childForm.get(input)?.touched);
    return validation;
  }
  emaiErrors() {
    return this.childForm.get('email')?.hasError('required')
      ? 'This field is required'
      : this.childForm.get('email')?.hasError('pattern')
      ? 'Not a valid emailaddress'
      : '';
  }
  dateErrors() {
    return this.childForm.get('dateOfBirth')?.hasError('required')
      ? 'This field is required'
      : this.childForm.get('dateOfBirth')?.hasError('dateNotInFuture')
      ? 'Not a valid date of birth'
      : '';
  }
  dateNotInFutureValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const currentDate = new Date();

    if (inputDate > currentDate) {
      return { dateNotInFuture: true };
    }

    return null;
  }
  setGender(gender: string) {
    this.childForm.get('gender')?.setValue(gender);
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
