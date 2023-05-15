import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FlightDataType, ReservationDataType } from 'src/app/models/flyght-data.model';
import { StoreType } from 'src/app/redux/store.model';

@Component({
  selector: 'app-flight-fare',
  templateUrl: './flight-fare.component.html',
  styleUrls: ['./flight-fare.component.css'],
})
export class FlightFareComponent implements OnInit{
  @Input() oneWayFlight?: FlightDataType;
  @Input() backFlight?: FlightDataType;
  @Input() flightDetails!: any ;
  passengerCount!:any
constructor(private store: Store<StoreType>){}
  ngOnInit(): void {
    this.store
      .select('passengersCount')
      .subscribe((data) => (this.passengerCount = data));
    console.log(this.passengerCount);
    
  }
  totalPrice(){
    if(!this.oneWayFlight ) return
    let total = 0;
    if (this.passengerCount) {
       total = (this.oneWayFlight.cost * this.passengerCount?.adult) + 
                    (this.oneWayFlight.cost * this.passengerCount?.child) + 
                    (this.oneWayFlight.cost * this.passengerCount?.infant);
    }
    if(this.backFlight) {
      total += (this.backFlight.cost * this.passengerCount?.adult) + 
                    (this.backFlight.cost * this.passengerCount?.child) + 
                    (this.backFlight.cost * this.passengerCount?.infant);
    }
    return total;
  }
  
}
