import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContentMainComponent } from './main-page/main-view/content-main.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: '', component: ContentMainComponent },
  {
    path: 'cart',
    loadChildren: () =>
      import('./shopping-cart/shopping-cart.module').then(
        (m) => m.ShoppingCartModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'booking',
    loadChildren: () =>
      import('./booking/booking.module').then((m) => m.BookingViewModule),
  },
  {
    path: 'acount',
    loadChildren: () =>
      import('./user-acount/user-acount.module').then(
        (m) => m.UserAcountModule
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
