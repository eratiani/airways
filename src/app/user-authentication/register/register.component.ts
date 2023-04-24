import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  fieldRequired: string = "This field is required"
   constructor() { 
   }
 
   ngOnInit() {
     this.createForm();
   }
   createForm(){
       let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     this.registerForm = new FormGroup(
       {'username': new FormControl(null,[Validators.required]),
       'email': new FormControl(null,[Validators.required, Validators.pattern(emailregex)]),
       'password': new FormControl(null, [Validators.required, this.checkPassword]),
       'dateOfBirth': new FormControl(null, [Validators.required, this.dateNotInFutureValidator]),
       'gender':  new FormControl(null, [Validators.required]),
       'country':  new FormControl(null, [Validators.required]),
       'termsAndServices':  new FormControl(null, [ this.termsAndServicesvalidation]),
      }
     )
   
 
   }
   termsAndServicesvalidation(control:AbstractControl){
    return control.value
   }
     emaiErrors() {
     return this.registerForm.get('email')?.hasError('required') ? 'This field is required' :
       this.registerForm.get('email')?.hasError('pattern') ? 'Not a valid emailaddress' :''
   }
   dateErrors() {
    return this.registerForm.get('dateOfBirth')?.hasError('required') ? 'This field is required' :
      this.registerForm.get('dateOfBirth')?.hasError('dateNotInFuture') ? 'Not a valid date of birth' :''
  }
 checkPassword(control:AbstractControl ) {
     let enteredPassword = control.value
     let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
     return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
   }
   getErrorPassword() {
     return this.registerForm.get('password')?.hasError('required') ? 'This field is required (The password must be at least six characters, one uppercase letter and one number)' :
       this.registerForm.get('password')?.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
   }
   checkValidation(input: string){
     const validation = this.registerForm.get(input)?.invalid && (this.registerForm.get(input)?.dirty || this.registerForm.get(input)?.touched)
     return validation;
   }
    onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    
     const email = formData.value.email;
     const password = formData.value.password;
     const username = formData.value.username;
     console.log(formData,formDirective);
     
    //  this.auth.registerUSer(email, password, username);
    //   formDirective.resetForm();
    //  this.registerForm.reset();
 }
 dateNotInFutureValidator(control: AbstractControl): ValidationErrors | null {
  const inputDate = new Date(control.value);
  const currentDate = new Date();

  if (inputDate > currentDate) {
    return { dateNotInFuture: true };
  }

  return null;
}
 }