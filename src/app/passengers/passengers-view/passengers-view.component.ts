import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { HeaderStateService } from 'src/app/core/services/header-state.service';
import { StoreType } from 'src/app/redux/store.model';

@Component({
  selector: 'app-passengers-view',
  templateUrl: './passengers-view.component.html',
  styleUrls: ['./passengers-view.component.css'],
})
export class PassengersViewComponent implements OnInit, OnDestroy {
  passengersForm = this.fb.group({
    adult: this.fb.array<FormGroup>([]),
    child: this.fb.array<FormGroup>([]),
    infant: this.fb.array<FormGroup>([]),
    contact: this.fb.group({}),
  });
  passengers: Exclude<keyof typeof this.passengersForm.value, 'contact'>[] = [
    'adult',
    'child',
    'infant',
  ];

  constructor(
    private headerState: HeaderStateService,
    private fb: FormBuilder,
    private store: Store<StoreType>
  ) {
    store.select('passengersCount').subscribe((passeng) => {
      console.log('passang from store: ', passeng);
      for (const [type, count] of Object.entries(passeng) as [
        keyof typeof passeng,
        number
      ][]) {
        for (let i = 0; i < count; i += 1) {
          this.passengersForm.controls[type].push(this.createGroup());
        }
      }
    });
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

  addMember(
    member: Exclude<keyof typeof this.passengersForm.value, 'contact'>
  ) {
    console.log();
    this.passengersForm.controls[member].push(this.createGroup());
  }

  removeMember(
    member: Exclude<keyof typeof this.passengersForm.value, 'contact'>
  ) {
    this.passengersForm.controls[member].removeAt(
      this.passengersForm.controls[member].length - 1
    );
  }

  ngOnInit(): void {
    this.headerState.toggleUserOnPassengersPage();
  }

  ngOnDestroy(): void {
    this.headerState.toggleUserOnPassengersPage();
  }

  onSubmit() {
    // console.log(this.passengersForm.value, this.passengersForm);
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
