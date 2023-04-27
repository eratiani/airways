import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlightDataType } from '../../models/flyght-data.model';
import { map } from 'rxjs';

const SERVER = 'http://localhost:3000';
@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}
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
