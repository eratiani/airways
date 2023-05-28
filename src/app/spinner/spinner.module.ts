import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner.components';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [MatProgressSpinnerModule, CommonModule],
  exports: [SpinnerComponent],
})
export class SpinnerModule {}
