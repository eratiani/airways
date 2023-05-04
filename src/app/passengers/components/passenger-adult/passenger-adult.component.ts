import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'app-passenger-adult',
  templateUrl: './passenger-adult.component.html',
  styleUrls: ['./passenger-adult.component.css'],
})
export class PassengerAdultComponent implements OnInit {
  @Input() control!: FormGroup;
  @Input() title!: string;
  adultForm!: FormGroup<{
    name: FormControl<string>;

    surname: FormControl<string>;
    gender: FormControl<string>;
    dateOfBirth: FormControl<string>;
    specialNeeds: FormControl<boolean>;
  }>;
  fieldRequired: string = 'This field is required';
  ngOnInit(): void {
    this.createForm();
    console.log(this.control);
    // this.control.addControl('name',new FormControl('', { validators: Validators.required }))
    // this.control.addControl(
    //   'name',
    //   new FormControl('', { validators: Validators.required })
    // );
  }
  createForm() {
    this.adultForm = new FormGroup({
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
      this.adultForm.get(input)?.invalid &&
      (this.adultForm.get(input)?.dirty || this.adultForm.get(input)?.touched);
    return validation;
  }
  emaiErrors() {
    return this.adultForm.get('email')?.hasError('required')
      ? 'This field is required'
      : this.adultForm.get('email')?.hasError('pattern')
      ? 'Not a valid emailaddress'
      : '';
  }
  dateErrors() {
    return this.adultForm.get('dateOfBirth')?.hasError('required')
      ? 'This field is required'
      : this.adultForm.get('dateOfBirth')?.hasError('dateNotInFuture')
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
    this.adultForm.get('gender')?.setValue(gender);
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
