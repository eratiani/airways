import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { cities } from 'CONST';
import { SearchService } from '../../services/search-flyght.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setPassangersCount } from 'src/app/redux/actions';
import { StoreType } from 'src/app/redux/store.model';
import { HeaderStateService } from 'src/app/core/services/header-state.service';
import { Subscription } from 'rxjs';
import { BackendUserService } from 'src/app/services/backend-user.service';

type OptionsType = {
  adult: number;
  child: number;
  infant: number;
};

interface FormType {
  oneWay?: FormControl<boolean>;
  from: FormControl<string>;
  to: FormControl<string>;
  date: FormGroup<{
    startDate: FormControl<string>;
    endDate: FormControl<string>;
  }>;
  passengers: FormControl<{ adult: number; child: number; infant: number }>;
}

@Component({
  selector: 'app-flights-form',
  templateUrl: './flights-form.component.html',
  styleUrls: ['./flights-form.component.css'],
})
export class FlightsFormComponent implements OnInit {
  @Input() isEdit = false;
  cities = cities;
  dateSub!: Subscription;
  errorMessage = 'Fill this field';
  searchForm: FormGroup<FormType> = this.fb.nonNullable.group({
    // oneWay: [false],
    from: [this.userState.searchParams?.from || 'Paris', Validators.required], // to change for ''
    to: [this.userState.searchParams?.to || 'Seoul', [Validators.required]], // to change for ''
    date: this.fb.nonNullable.group({
      startDate: [this.userState.searchParams?.date?.startDate || ''],
      endDate: [this.userState.searchParams?.date?.endDate || ''],
    }),
    passengers: [{ adult: 0, child: 0, infant: 0 }],
  });
  keys = Object.keys(
    this.searchForm.controls.passengers.value
  ) as (keyof OptionsType)[];

  constructor(
    private fb: FormBuilder,
    private search: SearchService,
    private router: Router,
    private store: Store<StoreType>,
    public headState: HeaderStateService,
    private userState: BackendUserService
  ) {}

  ngOnInit(): void {
    if (!this.isEdit) {
      this.searchForm.addControl(
        'oneWay',
        new FormControl(false, { nonNullable: true })
      );
    }
  }

  toCamelCase(string: string) {
    return string.replace(/^\w/, (w) => w.toUpperCase());
  }

  increaseValue(e: Event, option: keyof OptionsType) {
    e.stopImmediatePropagation();
    const temp = this.searchForm.value.passengers!;
    this.searchForm.patchValue({
      passengers: { ...temp, [option]: temp[option] + 1 },
    });
  }

  decreaseValue(e: Event, option: keyof OptionsType) {
    e.stopImmediatePropagation();
    const temp = this.searchForm.value.passengers!;
    if (!temp[option]) {
      return;
    }
    this.searchForm.patchValue({
      passengers: { ...temp, [option]: temp[option] - 1 },
    });
  }
  onFlightSwap(ev: Event) {
    ev.preventDefault();
    const { from, to } = this.searchForm.value;
    this.searchForm.controls.from.setValue(to!);
    this.searchForm.controls.to.setValue(from!);
  }
  onSubmit() {
    if (this.searchForm.invalid) {
      return;
    }

    this.store.dispatch(setPassangersCount(this.searchForm.value.passengers!));

    // to do search with required seats avialable
    const { oneWay, from, to, date, passengers } = this.searchForm.value;
    if (date?.startDate) {
      console.log(new Date(date.startDate));
    }

    this.userState.searchParams = {
      oneWay,
      from,
      to,
      date: {
        startDate: date?.startDate
          ? new Date(date.startDate).toISOString()
          : '',
        endDate: date?.endDate ? new Date(date.endDate).toISOString() : '',
      },
      passengers,
    };

    this.search
      .search(oneWay!, from!, to!, date?.startDate, date?.endDate)
      .subscribe((data) => {
        this.router.navigateByUrl('booking');
      });
  }
}
