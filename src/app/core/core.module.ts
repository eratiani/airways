import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ProgressBarComponent],
  exports: [HeaderComponent, FooterComponent],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    RouterModule,
  ],
})
export class CoreModule {}
