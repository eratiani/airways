import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'app-passenger-infant',
  templateUrl: './passenger-infant.component.html',
  styleUrls: ['./passenger-infant.component.css'],
})
export class PassengerInfantComponent {
  @Input( ) infant!: any;
  fieldRequired: string = 'This field is required';
  ngOnInit(): void {
  }
 
  
  
  setGender(gender: string) {
    this.infant.get('gender')?.setValue(gender);
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
