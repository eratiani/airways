import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HeaderStateService } from 'src/app/core/services/header-state.service';

@Component({
  selector: 'app-passengers-view',
  templateUrl: './passengers-view.component.html',
  styleUrls: ['./passengers-view.component.css'],
})
export class PassengersViewComponent implements OnInit, OnDestroy {
  counts = {
    adult: 1,
    child: 2,
    infant: 2,
  };
  passengersForm = this.fb.group({
    adult: this.fb.array<FormGroup>([]),
    child: this.fb.array<FormGroup>([]),
    infant: this.fb.array<FormGroup>([]),
    contact: this.fb.group({}),
  });

  // getMember(name:keyof typeof this.passengersForm['controls']){
  //   return this.passengersForm.controls[name] as FormArray
  // }

  constructor(
    private headerState: HeaderStateService,
    private fb: FormBuilder
  ) {
    this.passengersForm.controls.adult.push(this.createGroup());
    this.passengersForm.controls.child.push(this.createGroup());
    this.passengersForm.controls.adult.push(this.createGroup());
    this.passengersForm.controls.adult.controls;
    // console.log(this.passengersForm);
    // this.passengersForm.get()
  }

  private createGroup() {
    return this.fb.group({
      name: ['', Validators.required],
      surname: [''],
    });
  }
  // get adults() {
  //   return this.passengersForm.get('adult') as FormArray;
  // }
  // oneControl() {
  //   return this.fb.group({
  //     name: [''],
  //   });
  // }
  ngOnInit(): void {
    this.headerState.toggleUserOnPassengersPage();
  }
  ngOnDestroy(): void {
    this.headerState.toggleUserOnPassengersPage();
  }

  onSubmit() {
    console.log(this.passengersForm.value, this.passengersForm);
  }
}
