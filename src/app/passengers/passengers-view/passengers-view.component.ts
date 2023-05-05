import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { HeaderStateService } from 'src/app/core/services/header-state.service';

@Component({
  selector: 'app-passengers-view',
  templateUrl: './passengers-view.component.html',
  styleUrls: ['./passengers-view.component.css'],
})
export class PassengersViewComponent implements OnInit, OnDestroy {
  // counts = {
  //   adult: 1,
  //   child: 2,
  //   infant: 2,
  // };
  passengersForm = this.fb.group({
    adult: this.fb.array<FormGroup>([]),
    child: this.fb.array<FormGroup>([]),
    infant: this.fb.array<FormGroup>([]),
    contact: this.fb.group({}),
  });

  constructor(
    private headerState: HeaderStateService,
    private fb: FormBuilder
  ) {
    this.passengersForm.controls.adult.push(this.createGroup());
    // this.passengersForm.controls.child.push(this.createGroup());
    // this.passengersForm.controls.adult.push(this.createGroup());
    this.passengersForm.controls.adult.controls;
    // console.log(this.passengersForm);
    // this.passengersForm.get()
  }

  private createGroup() {
    return this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      gender: ['male'],
      dOb: ['', [Validators.required, dateNotInFutureValidator]],
      specialNeeds: [false],
    });
  }

  ngOnInit(): void {
    this.headerState.toggleUserOnPassengersPage();
  }

  ngOnDestroy(): void {
    this.headerState.toggleUserOnPassengersPage();
  }

  onSubmit() {
    console.log(this.passengersForm.value, this.passengersForm);
  }
}

function dateNotInFutureValidator(
  control: AbstractControl
): ValidationErrors | null {
  const inputDate = new Date(control.value);
  const currentDate = new Date();
  if (inputDate > currentDate) {
    return { dateNotInFuture: true };
  }
  return null;
}
