import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  isLoading: boolean;
  constructor() {
    this.isLoading = false;
  }
  start() {
    this.isLoading = true;
  }
  stop() {
    this.isLoading = false;
  }
}
