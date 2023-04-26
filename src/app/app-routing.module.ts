import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentMainComponent } from './main-page/content-main/content-main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FlightsSearchResultComponent } from './booking/flights-search-result/flights-search-result.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: ContentMainComponent },
  { path: 'booking', component: FlightsSearchResultComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
