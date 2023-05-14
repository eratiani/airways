import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingViewComponent } from './booking-view/booking-view.component';
import { authGuard } from '../guards/auth.guard';

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
    canActivate: [authGuard],
  },
  {
    path: 'summary',
    loadChildren: () =>
      import('./../summary/summary.module').then((m) => m.SummaryModule),
    canActivate: [authGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class BookingRoutig {}
