import { Component, Input } from '@angular/core';
import { PassengerType } from 'src/app/models/flyght-data.model';

@Component({
  selector: 'app-passanger-info',
  templateUrl: './passanger-info.component.html',
  styleUrls: ['./passanger-info.component.css'],
})
export class PassangerInfoComponent {
  @Input('passenger') passengerArr!: PassengerType[];
  @Input() passangerType!: string;
}
