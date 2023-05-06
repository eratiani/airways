import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartViewComponent } from './shopping-cart-view/shopping-cart-view.component';
import { ShoppingCartTableComponent } from './components/shopping-cart-table/shopping-cart-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [ShoppingCartViewComponent, ShoppingCartTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports: [ShoppingCartViewComponent],
})
export class ShoppingCartModule {}
