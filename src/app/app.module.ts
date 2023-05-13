import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainPageModule } from './main-page/main-page.module';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import {
  flightsReducer,
  passangersCountReducer,
  reservationsReducer,
  selectedFlihgtReducer,
} from './redux/reducers';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MY_DATE_FORMAT } from './core/services/date-format';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { UserAuthenticationModule } from './user-authentication/user-authentication.module';
import { interceptorsProviders } from './interceptors';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    interceptorsProviders,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainPageModule,
    CoreModule,
    ShoppingCartModule,
    StoreModule.forRoot(
      {
        flightData: flightsReducer,
        selectedFlight: selectedFlihgtReducer,
        passengersCount: passangersCountReducer,
        reservations: reservationsReducer,
      },
      {}
    ),
    MatSnackBarModule,
    UserAuthenticationModule,
  ],
})
export class AppModule {}
