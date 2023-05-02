import { Component, Input } from '@angular/core';
import { FlightDataType } from 'src/app/models/flyght-data.model';

@Component({
  selector: 'app-flight-selected',
  templateUrl: './flight-selected.component.html',
  styleUrls: ['./flight-selected.component.css'],
})
export class FlightSelectedComponent {
  @Input() flight!: FlightDataType;
}
