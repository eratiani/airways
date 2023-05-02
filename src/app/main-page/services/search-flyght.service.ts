import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlightDataType } from '../../models/flyght-data.model';
import { map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { addFlightData } from 'src/app/redux/actions';
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
    return this.http.get<FlightDataType[]>(`${SERVER}/data`).pipe(
      map((res) =>
        res.filter((fl) => {
          return (
            fl.from === from &&
            fl.to === to &&
            (start && end ? this.dateMatch(fl.date, start, end) : true)
          );
        })
      ),
      tap((data) => {
        this.store.dispatch(addFlightData({ data }));
      })
    );
  }

  private dateMatch(origin: string, start: string, end: string) {
    return (
      new Date(origin).getTime() > new Date(start).getTime() &&
      new Date(origin).getTime() < new Date(end).getTime()
    );
  }
}
