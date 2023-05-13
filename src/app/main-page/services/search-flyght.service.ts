import { HttpClient } from '@angular/common/http';
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

const SERVER = 'http://localhost:3000';
@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient, private store: Store<StoreType>) {
    this.store.select('flightData').subscribe((data) => {
      console.log('select: ', data);
    });
  }
  search(
    oneWay: boolean,
    from: string,
    to: string,
    start?: string,
    end?: string
  ) {
    const oneWay$ = this.getFlights(from, to, start, end).pipe(
      tap((data) => {
        if (data.length) {
          this.store.dispatch(flightOneWayAdd({ data }));
        }
        this.store.dispatch(resetBackFlights());
      })
    );

    const backWay$ = this.getFlights(to, from, start, end).pipe(
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

  private getFlights(from: string, to: string, start?: string, end?: string) {
    return this.http.get<FlightDataType[]>(`${SERVER}/data`).pipe(
      map((res) =>
        res.filter((fl) => {
          return (
            fl.from === from &&
            fl.to === to &&
            (start && end ? this.dateMatch(fl.date, start, end) : true)
          );
        })
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
