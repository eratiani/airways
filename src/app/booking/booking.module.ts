import { NgModule } from '@angular/core';
import { FlightsSearchResultComponent } from './components/flights-search-result/flights-search-result.component';
import { BookingViewComponent } from './booking-view/booking-view.component';
import { FlightsSearchInputComponent } from './components/flights-search-input/flights-search-input.component';
import { FlightSelectedComponent } from './components/flight-selected/flight-selected.component';
import { BookingRoutig } from './booking-routing.module';
import { HiglightDirective } from './directives/higlight.directive';
import { OneSideComponent } from './components/one-side/one-side.component';

import { MainPageModule } from '../main-page/main-page.module';

@NgModule({
  declarations: [
    FlightsSearchResultComponent,
    BookingViewComponent,
    FlightsSearchInputComponent,
    FlightSelectedComponent,
    HiglightDirective,
    OneSideComponent,
  ],
  imports: [BookingRoutig, MainPageModule],
  exports: [],
})
export class BookingViewModule {}
