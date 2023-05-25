import {
  Component,
  // HostListener,
  OnDestroy,
  // ViewChild,
} from '@angular/core';
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
import { BackendUserService } from 'src/app/services/backend-user.service';
// import { PassangerDataService } from 'src/app/services/passanger-data.service';
// import { PassengerContactInfoComponent } from '../components/passenger-contact-info/passenger-contact-info.component';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { PassengerType } from 'src/app/models/flyght-data.model';

export interface ContactType {
  email: FormControl<string>;
  country: FormControl<
    Record<
      'name' | 'alpha2Code' | 'alpha3Code' | 'numericCode' | 'callingCode',
      string
    >
  >;
  telephone: FormControl<string>;
}
export interface EachPassengerType {
  name: FormControl<string>;
  surname: FormControl<string>;
  gender: FormControl<string>;
  dOb: FormControl<string>;
  specialNeeds: FormControl<boolean>;
  baggage: FormControl<number>;
}

@Component({
  selector: 'app-passengers-view',
  templateUrl: './passengers-view.component.html',
  styleUrls: ['./passengers-view.component.css'],
})
export class PassengersViewComponent implements OnDestroy {
  // sub!: Subscription;
  destroyer = new Subject<void>();
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
  // @HostListener('window:beforeunload', ['$event'])
  // @ViewChild(PassengerContactInfoComponent)
  // private passengerContactInfoComponent!: PassengerContactInfoComponent;
  constructor(
    private fb: FormBuilder,
    private store: Store<StoreType>,
    private router: Router,
    private userState: BackendUserService // private passangerData: PassangerDataService
  ) {
    store
      .select('reservation')
      .pipe(takeUntil(this.destroyer))
      .subscribe((initReserv) => {
        if (!initReserv.passengers) {
          this.setFromPassengCount();
        } else {
          // console.log('from reservat: ', initReserv.passengers);
          const passeng = initReserv.passengers;
          for (const [type, each] of Object.entries(passeng) as [
            keyof typeof passeng,
            Partial<PassengerType>[]
          ][]) {
            for (let i = 0; i < each.length; i += 1) {
              this.passengersForm.controls[type].push(
                this.createGroup(each[i])
              );
            }
          }
        }
      });
  }

  private setFromPassengCount() {
    const passeng = this.userState.searchParams?.passengers;
    if (passeng) {
      console.log('passang from store: ', passeng);
      for (const [type, count] of Object.entries(passeng) as [
        keyof typeof passeng,
        number
      ][]) {
        for (let i = 0; i < count; i += 1) {
          this.passengersForm.controls[type].push(this.createGroup());
        }
      }
    }
  }
  // beforeunloadHandler(event: Event) {
  //   const targetRoute = this.router.url;
  //   if (targetRoute !== '/summary' && !targetRoute.includes('/detail')) {
  //     this.passangerData.isEditMode = false;
  //     console.log(this.passangerData.isEditMode);
  //   }
  // }
  ngOnDestroy(): void {
    this.destroyer.next();
    this.destroyer.complete();
  }
  private createGroup(passenger?: Partial<PassengerType>) {
    return this.fb.nonNullable.group({
      name: [
        passenger?.name || '',
        [Validators.required, nameSurnamevalidation],
      ],
      surname: [
        passenger?.surname || '',
        [Validators.required, nameSurnamevalidation],
      ],
      gender: [passenger?.gender || 'male'],
      dOb: [
        passenger?.dOb || '',
        [Validators.required, dateNotInFutureValidator],
      ],
      specialNeeds: [passenger?.specialNeeds || false],
      baggage: [passenger?.baggage || 0],
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
        contact: { ...contact, country: contact!.country },
      })
    );

    this.router.navigate(['/booking/summary']);
  }
}
function nameSurnamevalidation(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  const pattern = /^[A-Za-z ]*$/;

  if (value && !pattern.test(value)) {
    return { patternval: true };
  }
  return null;
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
