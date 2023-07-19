import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {User} from "../../../model/models";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
  });

  constructor(private dialogRef: MatDialogRef<RegisterComponent>, private authService: AuthService){}

  register(): void{
    if (this.registerForm.valid){
      let user: User = {
        email: this.registerForm.get("email")?.value,
        firstName: this.registerForm.get("name")?.value,
        lastName: this.registerForm.get("surname")?.value,
        password: this.registerForm.get("password")?.value
      }
      //TODO: add actual user email here
      this.authService.register(user, "testingemail@123").subscribe({
        next: value => this.dialogRef.close()
      });
    }
  }


}
