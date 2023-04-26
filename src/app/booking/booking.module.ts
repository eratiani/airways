import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsSearchResultComponent } from './flights-search-result/flights-search-result.component';
import { BookingViewComponent } from './booking-view/booking-view.component';
import { FlightsSearchInputComponent } from './flights-search-input/flights-search-input.component';
import { FlightSelectedComponent } from './flight-selected/flight-selected.component';
import { ReturnFlightSelectedComponent } from './return-flight-selected/return-flight-selected.component';
import { BookingRoutig } from './booking-routing.module';

@NgModule({
  declarations: [
    FlightsSearchResultComponent,
    BookingViewComponent,
    FlightsSearchInputComponent,
    FlightSelectedComponent,
    ReturnFlightSelectedComponent,
  ],
  imports: [CommonModule, BookingRoutig],
  exports: [
    // BookingViewComponent
  ],
})
export class BookingViewModule {}
