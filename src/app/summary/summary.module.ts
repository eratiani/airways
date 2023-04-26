import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryViewComponent } from './summary-view/summary-view.component';
import {  MatCardModule } from '@angular/material/card';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FlightFareComponent } from './flight-fare/flight-fare.component';



@NgModule({
  declarations: [
    SummaryViewComponent,
    FlightDetailsComponent,
    FlightFareComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports:[SummaryViewComponent]
})
export class SummaryModule { }
