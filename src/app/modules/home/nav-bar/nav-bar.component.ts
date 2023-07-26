import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { LoginComponent } from '../../auth/login/login.component';
import { RegisterComponent } from '../../auth/register/register.component';
import { AuthService } from '../../auth/auth.service';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
    
  constructor(public loginDialog: MatDialog, public registerDialog: MatDialog, public authService: AuthService, public webSocketService: WebSocketService){}
  
  ngOnInit(): void {
    this.webSocketService.startConnection();
    this.webSocketService.addTransferChartDataListener();
  }

  login(): void {
    this.loginDialog.open(LoginComponent);
  }

  register(): void {
    this.registerDialog.open(RegisterComponent);
  }

  logout(): void {
    this.authService.logout();
  }
}
