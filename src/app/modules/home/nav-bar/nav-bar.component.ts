import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { LoginComponent } from '../../auth/login/login.component';
import { RegisterComponent } from '../../auth/register/register.component';
import { AuthService } from '../../auth/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(public loginDialog: MatDialog,
              public registerDialog: MatDialog,
              public authService: AuthService,
              public router: Router){}

  login(): void {
    this.loginDialog.open(LoginComponent);
  }

  register(): void {
    this.registerDialog.open(RegisterComponent);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['welcome']);
  }

  inputCreation(): void {
    this.router.navigate(["input-creation"]);
  }

  inputDisplay() {
    this.router.navigate(["input-display"]);
  }

  reports() {
    this.router.navigate(["reports"]);
  }
}
