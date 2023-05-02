import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingViewComponent } from './views/booking-view/booking-view.component';

const routes: Routes = [
  {
    path: '',
    component: BookingViewComponent,
  },
  {
    path: 'detail',
    loadChildren: () =>
      import('./../passengers/passengers.module').then(
        (m) => m.PassengersModule
      ),
  },
  {
    path: 'summary',
    loadChildren: () =>
      import('./../summary/summary.module').then((m) => m.SummaryModule),
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class BookingRoutig {}
