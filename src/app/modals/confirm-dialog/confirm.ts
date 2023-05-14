import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'confirm-dialog',
  template: `
    <h2 mat-dialog-title>{{ message }}</h2>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Ok</button>
      <button mat-button [mat-dialog-close]="false">Cancel</button>
    </div>
  `,
})
export class ConfirmLogin {
  constructor(@Inject(MAT_DIALOG_DATA) public message: string) {}
}
