import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHiglight]',
})
export class HiglightDirective implements OnInit {
  @Input() elementAvailableSeats: number = 0;
  @Input() elementTotalSeats: number = 0;
  @HostBinding('style.backgroundColor') backgroundColor = 'inherit';

  ngOnInit(): void {
    const availableSeats = this.elementAvailableSeats;
    const TotalSeats = this.elementTotalSeats;
    if (availableSeats < 10) {
      console.log(TotalSeats);

      console.log(availableSeats);

      this.backgroundColor = 'red';
    } else if (availableSeats >= TotalSeats / 2) {
      this.backgroundColor = 'green';
    } else if (availableSeats >= 10 && availableSeats < TotalSeats / 2) {
      this.backgroundColor = 'orange';
    }
  }
}
