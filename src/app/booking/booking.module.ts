import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsSearchResultComponent } from './components/flights-search-result/flights-search-result.component';
import { BookingViewComponent } from './booking-view/booking-view.component';
import { FlightsSearchInputComponent } from './components/flights-search-input/flights-search-input.component';
import { FlightSelectedComponent } from './components/flight-selected/flight-selected.component';
import { BookingRoutig } from './booking-routing.module';
import { HiglightDirective } from './directives/higlight.directive';
import { OneSideComponent } from './components/one-side/one-side.component';
import { UserAuthenticationModule } from '../user-authentication/user-authentication.module';
import { BookingEditComponent } from './components/booking-edit/booking-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FlightsSearchResultComponent,
    BookingViewComponent,
    FlightsSearchInputComponent,
    FlightSelectedComponent,
    HiglightDirective,
    OneSideComponent,
    BookingEditComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutig,
    UserAuthenticationModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    RouterModule,
  ],
  exports: [],
})
export class BookingViewModule {}
