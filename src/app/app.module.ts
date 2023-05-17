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
  reservationReducer,
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
import { interceptorsProviders } from './interceptors';
import { ConfirmLogin } from './modals/confirm-dialog/confirm';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, ConfirmLogin],
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
    MatDialogModule,
    MatButtonModule,
    StoreModule.forRoot(
      {
        flightData: flightsReducer,
        selectedFlight: selectedFlihgtReducer,
        passengersCount: passangersCountReducer,
        reservation: reservationReducer,
      },
      {}
    ),
    MatSnackBarModule,
  ],
})
export class AppModule {}
