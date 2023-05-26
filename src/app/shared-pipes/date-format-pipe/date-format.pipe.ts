import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

const datePipeInst = new DatePipe('en-US');

@Pipe({ name: 'userFormat' })
export class DateFormatPipe implements PipeTransform {
  transform(value: string | number | Date, format: string, userFormat: string) {
    return datePipeInst.transform(value, FORMATS[format][userFormat]);
  }
}

const FORMATS: Record<string, Record<string, string>> = {
  mediumDate: {
    ['MM/DD/YYYY']: 'MMM d, y',
    ['DD/MM/YYYY']: 'd MMM, y',
    ['YYYY/DD/MM']: 'y, d MMM',
    ['YYYY/MM/DD']: 'y, MMM d',
  },
  shortDate: {
    ['MM/DD/YYYY']: 'MMM dd',
    ['DD/MM/YYYY']: 'dd MMM',
    ['YYYY/DD/MM']: 'dd MMM',
    ['YYYY/MM/DD']: 'MMM dd',
  },
};
