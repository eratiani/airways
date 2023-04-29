import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContentMainComponent } from './main-page/components/content-main/content-main.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: ContentMainComponent },
  {
    path: 'booking',
    loadChildren: () =>
      import('./booking/booking.module').then((m) => m.BookingViewModule),
  },
  {
    path: 'passengers',
    loadChildren: () =>
      import('./passengers/passengers.module').then((m) => m.PassengersModule),
  },
  {
    path: 'summary',
    loadChildren: () =>
      import('./summary/summary.module').then((m) => m.SummaryModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
