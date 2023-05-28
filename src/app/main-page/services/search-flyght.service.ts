import { Injectable } from '@angular/core';
import { FlightDataType } from '../../models/flyght-data.model';
import { Observable, forkJoin, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  flightBackAdd,
  flightOneWayAdd,
  resetBackFlights,
} from 'src/app/redux/actions';
import { StoreType } from 'src/app/redux/store.model';
import { RequestService } from 'src/app/services/http-request.service';

@Injectable()
export class SearchService {
  constructor(
    private request: RequestService,
    private store: Store<StoreType>
  ) {}
  search(
    oneWay: boolean,
    from: string,
    to: string,
    start?: string,
    end?: string,
    passCount?: number
  ) {
    const oneWay$ = this.getFlights(from, to, start, end, passCount).pipe(
      tap((data) => {
        if (data.length) {
          this.store.dispatch(flightOneWayAdd({ data }));
        }
        this.store.dispatch(resetBackFlights());
      })
    );

    const backWay$ = this.getFlights(to, from, start, end, passCount).pipe(
      tap((data) => {
        if (data.length) {
          this.store.dispatch(flightBackAdd({ data }));
        }
      })
    );
    const all: Observable<FlightDataType[]>[] = [oneWay$];
    if (!oneWay) {
      all.push(backWay$);
    }
    return forkJoin(all);
  }

  private getFlights(
    from: string,
    to: string,
    start?: string,
    end?: string,
    seatsAvailable?: number
  ) {
    return this.request.getFlights().pipe(
      map((res) =>
        res
          .filter((fl) => {
            return (
              fl.from === from &&
              fl.to === to &&
              (start && end ? this.dateMatch(fl.date, start, end) : true) &&
              (seatsAvailable ? seatsAvailable <= fl.available_seats : true)
            );
          })
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
      )
    );
  }

  private dateMatch(origin: string, start: string, end: string) {
    return (
      new Date(origin).getTime() > new Date(start).getTime() &&
      new Date(origin).getTime() < new Date(end).getTime()
    );
  }
}
