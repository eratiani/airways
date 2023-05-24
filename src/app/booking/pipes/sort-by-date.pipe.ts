import { Pipe, PipeTransform } from '@angular/core';
import { FlightDataType } from 'src/app/models/flyght-data.model';

@Pipe({ name: 'byDate' })
export class SortByDatePipe implements PipeTransform {
  transform(value: FlightDataType[]) {
    return value.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }
}
