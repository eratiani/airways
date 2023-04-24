import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flights-form',
  templateUrl: './flights-form.component.html',
  styleUrls: ['./flights-form.component.css'],
})
export class FlightsFormComponent implements OnInit {
  selected = 'option2';
  oneWayTrip:boolean = false;
  optionValues:any = {
    adult: 0,
    child: 0,
    infant: 0
  };
  selectedFlightType:string = "Round Trip"
 private oneWayTripForm!: FormGroup;
 private twoWayTripForm!: FormGroup;
  constructor(private fb: FormBuilder, ){

  }
  ngOnInit(){
this.oneWayTripForm = this.fb.group({
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  gender: ['', Validators.required],
});
this.twoWayTripForm = this.fb.group({
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  gender: ['', Validators.required],
});
  }
  onOneWayFlight() {
    this.oneWayTrip = true;
  }
  onRoundTrip() {
    this.oneWayTrip = false;
  }
  

  increaseValue(e:Event,option: string) {
    e.stopImmediatePropagation()
    this.optionValues[option]++;
  }

  decreaseValue(e:Event,option: string) {
    e.stopImmediatePropagation();
    if (this.optionValues[option] > 0) {
      this.optionValues[option]--;
    }
  }
}
