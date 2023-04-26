import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

// import { HeaderComponent } from '../core/header/header.component';
// import { FooterComponent } from '../core/footer/footer.component';
import { ContentMainComponent } from './content-main/content-main.component';
import { FlightsFormComponent } from './flights-form/flights-form.component';
import { UserAuthenticationModule } from '../user-authentication/user-authentication.module';
import { BookingViewModule } from '../booking/booking.module';
import { PassengersModule } from '../passengers/passengers.module';

@NgModule({
  declarations: [
    // HeaderComponent,
    // FooterComponent,
    ContentMainComponent,
    FlightsFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    // MatFormFieldModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    UserAuthenticationModule,
    BookingViewModule,
    PassengersModule,
  ],
})
export class MainPageModule {}
