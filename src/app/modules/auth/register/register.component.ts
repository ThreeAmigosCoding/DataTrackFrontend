import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {AuthService} from "../auth.service";
import {UserRegistration} from "../../../model/models";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private dialogRef: MatDialogRef<RegisterComponent>,
              private snackBar: MatSnackBar,
              private authService: AuthService){}

  register(): void{
    if (this.registerForm.valid){
      let user: UserRegistration = {
        email: this.registerForm.get("email")?.value,
        firstName: this.registerForm.get("name")?.value,
        lastName: this.registerForm.get("surname")?.value,
        password: this.registerForm.get("password")?.value
      }

      this.authService.register(user, this.authService.getUserMail()).subscribe({
        next: value => {
          this.snackBar.open(value.message, "OK", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
          this.dialogRef.close()
        }
      });
    }
  }


}
