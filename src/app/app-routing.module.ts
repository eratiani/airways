import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContentMainComponent } from './main-page/components/content-main/content-main.component';
import { ShoppingCartViewComponent } from './shopping-cart/shopping-cart-view/shopping-cart-view.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: '', component: ContentMainComponent },
  {
    path: 'table',
    component: ShoppingCartViewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'booking',
    loadChildren: () =>
      import('./booking/booking.module').then((m) => m.BookingViewModule),
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
