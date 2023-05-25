import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
  HostListener,
} from '@angular/core';
import { FlightDataType } from 'src/app/models/flyght-data.model';
import { OneSideStateService } from '../../services/one-side-state.service';
import { HeaderStateService } from 'src/app/core/services/header-state.service';

export type SideType = 'one-way' | 'back';

@Component({
  selector: 'one-side',
  styleUrls: ['./one-side.component.css'],
  templateUrl: './one-side.component.html',
  providers: [OneSideStateService],
})
export class OneSideComponent implements OnChanges {
  // @Input() type!: SideType;
  @Input() flights: FlightDataType[] = [];
  flightsCurrent: FlightDataType[] = [];
  @Output() storeSelect = new EventEmitter<FlightDataType>();
  selectedCard?: FlightDataType;
  flightIndex: number = 0;
  itemsToShow!:number
  
  constructor(
    public state: OneSideStateService,
    public headerState: HeaderStateService
  ) {
    this.itemsToShow = this.checkScreenWidth()
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.itemsToShow = this.checkScreenWidth();
    this.render(this.itemsToShow);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.itemsToShow = this.checkScreenWidth();
    if (changes['flights']) {
      this.flights = changes['flights'].currentValue;
      this.flightsCurrent = this.flights.slice(0, this.itemsToShow);
    }
  }

  selectCard(flightCard: HTMLDivElement, flight: FlightDataType) {
    Array.from(flightCard.parentElement?.children || []).forEach((elem) => {
      elem.classList.remove('moveElement');
    });
    flightCard.classList.add('moveElement');
    this.selectedCard = flight;
  }

  moveRIght() {
  
  
    if (this.flights.length < this.itemsToShow) return;
    this.flightIndex = (this.flightIndex + 1) % this.flights.length;
    this.render(this.itemsToShow);
  }
checkScreenWidth(){
  const screenWidth = window.innerWidth;
  if (screenWidth <= 360) {
    return  1
  }else if(screenWidth > 360 && screenWidth <= 700){
    return 2
  } else {
    return 5
  }
}
  moveLeft() {
    
   
    if (this.flights.length < this.itemsToShow) return;
    this.flightIndex =
      (this.flightIndex - 1 + this.flights.length) % this.flights.length;
    this.render(this.itemsToShow);
  }

  render(numOfItems:number) {
    const startIndex = this.flightIndex;
    const endIndex = (this.flightIndex + numOfItems) % this.flights.length;
    if (startIndex < endIndex) {
      this.flightsCurrent = this.flights.slice(startIndex, endIndex);
    } else {
      this.flightsCurrent = this.flights
        .slice(startIndex)
        .concat(this.flights.slice(0, endIndex));
    }
  }

  selectFlight(doSelect: boolean) {
    if (doSelect) {
      this.state.setSelected();
      this.storeSelect.emit(this.selectedCard);
    } else {
      this.state.setUnselected();
    }
  }
}
