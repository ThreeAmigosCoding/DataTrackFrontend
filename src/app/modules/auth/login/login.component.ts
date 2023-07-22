import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(private dialogRef: MatDialogRef<LoginComponent>, private authService: AuthService){}

  login(): void{
    if (this.loginForm.valid){
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: value => {
          localStorage.setItem('user', JSON.stringify(value));
          this.authService.setUserLogged();
        },
        error: err => alert(err.message)
      });
    }
  }
}
