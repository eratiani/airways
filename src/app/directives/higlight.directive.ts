import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appHiglight]',
})
export class HiglightDirective {
  @Input('elementAvailableSeats') elementAvailableSeats = '';
  @Input('elementTotalSeats') elementTotalSeats = '';
  @HostBinding('style.backgroundColor') backgroundColor = 'red';
  ngOnInit(): void {
    const availableSeats = -this.elementAvailableSeats;
    const TotalSeats = -this.elementTotalSeats;
    if (availableSeats < 10) {
      this.backgroundColor = 'red';
    } else if (availableSeats >= TotalSeats / 2) {
      this.backgroundColor = 'green';
    } else if (availableSeats >= 10 && availableSeats < TotalSeats / 2) {
      this.backgroundColor = 'orange';
    }
  }
}
