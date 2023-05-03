import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HeaderStateService } from 'src/app/core/services/header-state.service';
import { passangerModel } from './models/passanger.model';

@Component({
  selector: 'app-passengers-view',
  templateUrl: './passengers-view.component.html',
  styleUrls: ['./passengers-view.component.css'],
})
export class PassengersViewComponent implements OnInit, OnDestroy {
  PassengersForm!: FormGroup<{
    adult:FormGroup<passangerModel>,
    child:FormGroup<passangerModel>,
    contact:FormGroup<{email:FormControl}>
    infant:FormGroup<{name: FormControl<string>;
      surname: FormControl<string>;
      gender: FormControl<boolean>;
      dateOfBirth: FormControl<string>;
      }>
  }>;
  constructor(private headerState: HeaderStateService) {}
  createForm() {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.PassengersForm = new FormGroup({
      adult: new FormGroup({
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
        gender: new FormControl(false, {
          validators: [Validators.required],
          nonNullable: true,
        }),
        specialNeeds: new FormControl(false, {
          validators: [],
          nonNullable: true,
        }),
      }),
      child: new FormGroup({
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
        gender: new FormControl(false, {
          validators: [Validators.required],
          nonNullable: true,
        }),
        specialNeeds: new FormControl(false, {
          validators: [],
          nonNullable: true,
        }),
      }),
      infant: new FormGroup({
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
        gender: new FormControl(false, {
          validators: [Validators.required],
          nonNullable: true,
        }),
      }),
      contact: new FormGroup({
        email: new FormControl('', {
          validators: [Validators.required,Validators.pattern(emailregex)],
          nonNullable: true,
        }),
      })
    });
  }
  
  
  
  
  
  onSubmit() {
    return this.PassengersForm.value
  }
  
  checkValidation(groupName: string, input: string) {
    const validation =
      this.PassengersForm.get(`${groupName}.${input}`)?.invalid &&
      (this.PassengersForm.get(`${groupName}.${input}`)?.dirty ||
        this.PassengersForm.get(`${groupName}.${input}`)?.touched);
    return validation;
  }

  emailErrors(groupName: string) {
    return this.PassengersForm.get(`${groupName}.email`)?.hasError('required')
      ? 'This field is required'
      : this.PassengersForm.get(`${groupName}.email`)?.hasError('pattern')
      ? 'Not a valid email address'
      : '';
  }
  dateErrors(groupName: string) {
    return this.PassengersForm.get(`${groupName}.dateOfBirth`)?.hasError('required')
      ? 'This field is required'
      : this.PassengersForm.get(`${groupName}.dateOfBirth`)?.hasError('dateNotInFuture')
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
 
  ngOnInit(): void {
    this.headerState.toggleUserOnPassengersPage();
    this.createForm()
  }
  ngOnDestroy(): void {
    this.headerState.toggleUserOnPassengersPage();
  }
  
}
