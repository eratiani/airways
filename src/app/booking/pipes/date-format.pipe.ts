import { Pipe, PipeTransform } from '@angular/core';
import { HeaderStateService } from 'src/app/core/services/header-state.service';
import { FlightDataType } from 'src/app/models/flyght-data.model';

@Pipe({ name: 'byDate' })
export class SortByDatePipe implements PipeTransform {
  constructor(private format: HeaderStateService) {}
  transform(value: FlightDataType[], type: string) {
    switch (type) {
      case 'mediumDate':
        return null;
    }
    return null;
  }
}
