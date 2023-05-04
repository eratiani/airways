import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderStateService } from 'src/app/core/services/header-state.service';

// function createGroup() {
//   return new Form('',{validators:Validators.required})
// }

@Component({
  selector: 'app-passengers-view',
  templateUrl: './passengers-view.component.html',
  styleUrls: ['./passengers-view.component.css'],
})
export class PassengersViewComponent implements OnInit, OnDestroy {
  passengersForm = new FormGroup({
    adult: this.createGroup(),
    child: this.createGroup(),
  });
  constructor(private headerState: HeaderStateService) {}
  ngOnInit(): void {
    this.headerState.toggleUserOnPassengersPage();
  }
  ngOnDestroy(): void {
    this.headerState.toggleUserOnPassengersPage();
  }

  onSubmit() {
    console.log(this.passengersForm.value, this.passengersForm);
  }

  private createGroup() {
    return new FormGroup({
      name: new FormControl('', { validators: Validators.required }),
    });
  }
}
