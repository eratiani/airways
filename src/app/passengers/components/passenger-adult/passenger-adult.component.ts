import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormGroupDirective,
} from '@angular/forms';
import { passangerModel } from '../../passengers-view/models/passanger.model';

@Component({
  selector: 'app-passenger-adult',
  templateUrl: './passenger-adult.component.html',
  styleUrls: ['./passenger-adult.component.css'],
})
export class PassengerAdultComponent implements OnInit {
  @Input() adult!: any;
  fieldRequired: string = 'This field is required';
  ngOnInit(): void {
    console.log(this.adult);
    
    // this.createForm();
  }


  setGender(gender: string) {
    this.adult.get('gender')?.setValue(gender);
  }
  onSubmit(formDirective: FormGroupDirective): void {
    console.log(formDirective);

    // const email = formData.value.email;
    // const password = formData.value.password;
    // const username = formData.value.username;
    // const { email, password, username } = this.registerForm.value;
    // console.log(formDirective, password);
    // this.auth.registerUser(email!, password!).subscribe((test) => {
    //   console.log(test);
    //   formDirective.resetForm();
    //   this.registerForm.reset();
    // });
  }
}
