import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  logInForm!: FormGroup;
  fieldRequired: string = "This field is required"
   constructor() { }
 
   ngOnInit() {
     this.createForm();
   }
   createForm(){
       let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     this.logInForm = new FormGroup(
       {'username': new FormControl(null,[Validators.required]),
       'password': new FormControl(null, [Validators.required, this.checkPassword]),
      }
     )
   
 
   }
     emaiErrors() {
     return this.logInForm.get('email')?.hasError('required') ? 'This field is required' :
       this.logInForm.get('email')?.hasError('pattern') ? 'Not a valid emailaddress' :''
   }
 checkPassword(control:AbstractControl ) {
     let enteredPassword = control.value
     let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
     return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
   }
   getErrorPassword() {
     return this.logInForm.get('password')?.hasError('required') ? 'This field is required (The password must be at least six characters, one uppercase letter and one number)' :
       this.logInForm.get('password')?.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
   }
   checkValidation(input: string){
     const validation = this.logInForm.get(input)?.invalid && (this.logInForm.get(input)?.dirty || this.logInForm.get(input)?.touched)
     return validation;
   }
    onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    
     const email = formData.value.email;
     const password = formData.value.password;
     const username = formData.value.username;
    //  this.auth.registerUSer(email, password, username);
      formDirective.resetForm();
     this.logInForm.reset();
 }
 }
