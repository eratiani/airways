import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UserAcoutComponent } from './view/user-acount.component';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: ':userId',
    component: UserAcoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class UserAcountModule {}
