import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryViewComponent } from './summary-view/summary-view.component';
import { MatCardModule } from '@angular/material/card';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { FlightFareComponent } from './components/flight-fare/flight-fare.component';
import { RouterModule, Routes } from '@angular/router';
import { PassangerInfoComponent } from './components/passanger-info/passanger-info.component';
import { FlightFareTypeComponent } from './components/flight-fare-type/flight-fare-type.component';
import { DateFormatPipeModule } from '../shared-pipes/date-format-pipe/date-format.module';

const routes: Routes = [
  {
    path: '',
    component: SummaryViewComponent,
  },
  {
    path: ':mode',
    component: SummaryViewComponent,
  },
];

@NgModule({
  declarations: [
    SummaryViewComponent,
    FlightDetailsComponent,
    FlightFareComponent,
    PassangerInfoComponent,
    FlightFareTypeComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild(routes),
    DateFormatPipeModule,
  ],
})
export class SummaryModule {}
