import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsSearchResultComponent } from './flights-search-result/flights-search-result.component';
import { BookingViewComponent } from './booking-view/booking-view.component';
import { FlightsSearchInputComponent } from './flights-search-input/flights-search-input.component';



@NgModule({
  declarations: [
    FlightsSearchResultComponent,
    BookingViewComponent,
    FlightsSearchInputComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    BookingViewComponent
  ]
})
export class BookingViewModule { }
