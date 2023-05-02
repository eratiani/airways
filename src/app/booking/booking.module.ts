import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsSearchResultComponent } from './components/flights-search-result/flights-search-result.component';
import { BookingViewComponent } from './views/booking-view/booking-view.component';
import { FlightsSearchInputComponent } from './components/flights-search-input/flights-search-input.component';
import { FlightSelectedComponent } from './components/flight-selected/flight-selected.component';
import { ReturnFlightSelectedComponent } from './components/return-flight-selected/return-flight-selected.component';
import { BookingRoutig } from './booking-routing.module';
import { HiglightDirective } from './directives/higlight.directive';
import { OneSideComponent } from './components/one-side/one-side.component';

@NgModule({
  declarations: [
    FlightsSearchResultComponent,
    BookingViewComponent,
    FlightsSearchInputComponent,
    FlightSelectedComponent,
    ReturnFlightSelectedComponent,
    HiglightDirective,
    OneSideComponent,
  ],
  imports: [CommonModule, BookingRoutig],
  exports: [
    // BookingViewComponent
  ],
})
export class BookingViewModule {}
