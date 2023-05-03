import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
// import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { PassengersViewComponent } from './passengers-view/passengers-view.component';
import { PassengerAdultComponent } from './components/passenger-adult/passenger-adult.component';
import { PassengerChildComponent } from './components/passenger-child/passenger-child.component';
import { PassengerInfantComponent } from './components/passenger-infant/passenger-infant.component';
import { PassengerContactInfoComponent } from './components/passenger-contact-info/passenger-contact-info.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PassengersViewComponent,
    PassengerAdultComponent,
    PassengerChildComponent,
    PassengerInfantComponent,
    PassengerContactInfoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    HttpClientModule,
    MatSlideToggleModule,
    RouterModule.forChild([
      {
        path: '',
        component: PassengersViewComponent,
      },
    ]),
  ],
  // exports: [PassengersViewComponent],
})
export class PassengersModule {}
