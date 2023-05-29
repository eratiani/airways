import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { ContentMainComponent } from './main-view/content-main.component';
import { FlightsFormComponent } from './components/flights-form/flights-form.component';
import { UserAuthenticationModule } from '../user-authentication/user-authentication.module';
import { DateFormatPipeModule } from '../shared-pipes/date-format-pipe/date-format.module';

@NgModule({
  declarations: [ContentMainComponent, FlightsFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    UserAuthenticationModule,
    DateFormatPipeModule,
  ],
  exports: [
    CommonModule,
    UserAuthenticationModule,
    ReactiveFormsModule,
    FlightsFormComponent,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class MainPageModule {}
