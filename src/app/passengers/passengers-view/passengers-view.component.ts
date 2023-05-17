import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { addPassengers } from 'src/app/redux/actions';
import { StoreType } from 'src/app/redux/store.model';

export interface ContactType {
  email: FormControl<string>;
  country: FormControl<
    Record<'name' | 'alpha2Code' | 'alpha3Code' | 'numericCode', string>
  >;
  telephone: FormControl<string>;
}
export interface EachPassengerType {
  name: FormControl<string>;
  surname: FormControl<string>;
  gender: FormControl<string>;
  dOb: FormControl<string>;
  specialNeeds: FormControl<boolean>;
}

@Component({
  selector: 'app-passengers-view',
  templateUrl: './passengers-view.component.html',
  styleUrls: ['./passengers-view.component.css'],
})
export class PassengersViewComponent {
  passengersForm = this.fb.group({
    adult: this.fb.array<FormGroup<EachPassengerType>>([]),
    child: this.fb.array<FormGroup<EachPassengerType>>([]),
    infant: this.fb.array<FormGroup<EachPassengerType>>([]),
    contact: this.fb.group<Partial<ContactType>>({}),
  });
  passengers: Exclude<keyof typeof this.passengersForm.value, 'contact'>[] = [
    'adult',
    'child',
    'infant',
  ];

  constructor(
    private fb: FormBuilder,
    private store: Store<StoreType>,
    private router: Router
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
    return this.fb.nonNullable.group({
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
    this.passengersForm.controls[member].push(this.createGroup());
  }

  removeMember(
    member: Exclude<keyof typeof this.passengersForm.value, 'contact'>
  ) {
    this.passengersForm.controls[member].removeAt(
      this.passengersForm.controls[member].length - 1
    );
  }

  onSubmit() {
    if (!this.passengersForm.valid) {
      return;
    }
    const { adult, child, infant, contact } = this.passengersForm.value;

    this.store.dispatch(
      addPassengers({
        passengers: { adult, child, infant },
        contact: { ...contact, country: contact!.country!.name },
      })
    );
    this.router.navigate(['/booking/summary']);
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
