import { Component, Input } from '@angular/core';
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
  selector: 'app-passenger-child',
  templateUrl: './passenger-child.component.html',
  styleUrls: ['./passenger-child.component.css'],
})
export class PassengerChildComponent {
  @Input() child!: any;
 
  fieldRequired: string = 'This field is required';
  ngOnInit(): void {
   
  }
 
  setGender(gender: string) {
    this.child.get('gender')?.setValue(gender);
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
