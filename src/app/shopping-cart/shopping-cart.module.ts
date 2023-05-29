import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ShoppingCartTableComponent } from './components/shopping-cart-table/shopping-cart-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DateFormatPipeModule } from '../shared-pipes/date-format-pipe/date-format.module';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: ':userId/:mode',
    component: ShoppingCartTableComponent,
  },
];

@NgModule({
  declarations: [ShoppingCartTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    DateFormatPipeModule,
  ],
  providers: [DatePipe],
})
export class ShoppingCartModule {}
