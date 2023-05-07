import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlightDataType } from 'src/app/models/flyght-data.model';

@Component({
  selector: 'app-flight-selected',
  templateUrl: './flight-selected.component.html',
  styleUrls: ['./flight-selected.component.css'],
})
export class FlightSelectedComponent {
  @Input() flight!: FlightDataType;
  @Input() selected!: boolean;
  @Input() currencyFormat: string = 'USD';
  @Output() changeEv = new EventEmitter<boolean>();

  handleSelect() {
    this.changeEv.emit(!this.selected);
  }
}
