import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { cities } from 'CONST';
import { SearchService } from '../../services/search-flyght.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setPassangersCount } from 'src/app/redux/actions';
import { StoreType } from 'src/app/redux/store.model';
import { HeaderStateService } from 'src/app/core/services/header-state.service';
import { Subscription } from 'rxjs';

type OptionsType = {
  adult: number;
  child: number;
  infant: number;
};

@Component({
  selector: 'app-flights-form',
  templateUrl: './flights-form.component.html',
  styleUrls: ['./flights-form.component.css'],
})
export class FlightsFormComponent implements OnInit, OnDestroy {
  cities = cities;
  dateSub!: Subscription;
  errorMessage = 'Fill this field';
  dateFormat: string = 'DD/MM/YYYY';
  searchForm = this.fb.nonNullable.group({
    oneWay: [false],
    from: ['Paris', Validators.required], // to change for ''
    to: ['Seoul', [Validators.required]], // to change for ''
    date: this.fb.nonNullable.group({
      startDate: [''],
      endDate: [''],
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
    private headerService: HeaderStateService
  ) {}
  ngOnInit(): void {
    this.dateSub = this.headerService.dateFormatEmiter.subscribe(
      (date) => (this.dateFormat = date)
    );
  }
  ngOnDestroy(): void {
    this.dateSub.unsubscribe();
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

  onSubmit() {
    if (this.searchForm.invalid) {
      return;
    }

    this.store.dispatch(setPassangersCount(this.searchForm.value.passengers!));

    // to do search with required seats avialable
    const { oneWay, from, to, date } = this.searchForm.value;
    this.search
      .search(oneWay!, from!, to!, date?.startDate, date?.endDate)
      .subscribe((data) => {
        console.log(data);
        this.router.navigateByUrl('booking');
      });
  }
}
