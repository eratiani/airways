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
  selector: 'app-passenger-contact-info',
  templateUrl: './passenger-contact-info.component.html',
  styleUrls: ['./passenger-contact-info.component.css'],
})
export class PassengerContactInfoComponent {
  @Input() contact!: any;
  fieldRequired: string = 'This field is required';
  ngOnInit(): void {
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
