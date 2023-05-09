import { Injectable } from '@angular/core';
import { MY_DATE_FORMAT } from './date-format';

@Injectable({ providedIn: 'root' })
export class HeaderStateService {
  showAuth = false;
  currencyFormat = 'USD';
  dateFormat = 'DD/MM/YYYY';

  changeDataFormat(format: string) {
    this.dateFormat = format;
    MY_DATE_FORMAT.display = {
      dateInput: format,
      monthYearLabel: format
        .replace('/', ' ')
        .replace('DD', '')
        .replace('MM', 'MMM'),
    };
    MY_DATE_FORMAT.parse.dateInput = format;
  }
}
