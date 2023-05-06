import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderStateService } from 'src/app/core/services/header-state.service';

@Component({
  selector: 'app-shopping-cart-view',
  templateUrl: './shopping-cart-view.component.html',
  styleUrls: ['./shopping-cart-view.component.css'],
})
export class ShoppingCartViewComponent implements OnInit, OnDestroy {
  constructor(private headerState: HeaderStateService) {}
  ngOnInit(): void {
    this.headerState.toggleUserOnShoppingCartPage();
  }
  ngOnDestroy(): void {
    this.headerState.toggleUserOnShoppingCartPage();
  }
}
