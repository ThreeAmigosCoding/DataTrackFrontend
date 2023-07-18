import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { LoginComponent } from '../../auth/login/login.component';
import { RegisterComponent } from '../../auth/register/register.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
    
  constructor(public loginDialog: MatDialog, public registerDialog: MatDialog){}

  login(): void {
    this.loginDialog.open(LoginComponent);
  }

  register(): void {
    this.registerDialog.open(RegisterComponent);
  }
}
