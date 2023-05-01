import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { cities } from 'CONST';
import { SearchService } from '../../services/search-flyght.service';
import { StoreType } from 'src/app/redux/store.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flights-form',
  templateUrl: './flights-form.component.html',
  styleUrls: ['./flights-form.component.css'],
})
export class FlightsFormComponent implements OnInit {
  cities = cities;
  errorMessage = 'Fill this field';
  optionValues: any = {
    adult: 0,
    child: 0,
    infant: 0,
  };
  searchForm = this.fb.nonNullable.group({
    oneWay: [false],
    from: ['London', Validators.required], // to change for ''
    to: ['Dublin', [Validators.required]], // to change for ''
    date: this.fb.nonNullable.group({
      startDate: [''],
      endDate: [''],
    }),
  });
  constructor(
    private fb: FormBuilder,
    private search: SearchService,
    private router: Router
  ) {}
  ngOnInit() {}

  increaseValue(e: Event, option: string) {
    e.stopImmediatePropagation();
    this.optionValues[option]++;
  }

  decreaseValue(e: Event, option: string) {
    e.stopImmediatePropagation();
    if (this.optionValues[option] > 0) {
      this.optionValues[option]--;
    }
  }

  onSubmit() {
    // console.log(this.searchForm);
    if (this.searchForm.invalid) {
      return;
    }
    const { oneWay, from, to, date } = this.searchForm.value;
    this.search
      .search(oneWay!, from!, to!, date?.startDate, date?.endDate)
      .subscribe(() => {
        this.router.navigateByUrl('booking');
      });
  }
}
