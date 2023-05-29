import { Injectable } from '@angular/core';

@Injectable()
export class OneSideStateService {
  isSelected = false;

  setSelected() {
    this.isSelected = true;
  }

  setUnselected() {
    this.isSelected = false;
  }
}
