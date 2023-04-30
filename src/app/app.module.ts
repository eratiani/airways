import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainPageModule } from './main-page/main-page.module';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { flightsReducer } from './redux/reducers';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainPageModule,
    CoreModule,
    StoreModule.forRoot({ flightData: flightsReducer }, {}),
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
