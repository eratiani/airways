import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import {HttpClientModule} from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { LogInComponent } from './log-in/log-in.component';
import {  RegisterComponent } from './register/register.component';
import { AuthenticationFormContainerComponent } from './authentication-form-container/authentication-form-container.component';



@NgModule({
  declarations: [
    LogInComponent,
    RegisterComponent,
    AuthenticationFormContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatSelectCountryModule.forRoot('en'),
    HttpClientModule,
    MatCheckboxModule,
   
     
  ],

  exports: [
    AuthenticationFormContainerComponent
  ]
})
export class UserAuthenticationModule { }
