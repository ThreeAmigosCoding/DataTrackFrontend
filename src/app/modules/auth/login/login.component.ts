import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {AuthService} from "../auth.service";
import {WebSocketService} from "../../home/services/web-socket.service";
import {ToastrService} from "ngx-toastr";
import {AlarmService} from "../../home/services/alarm.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  alarmIds: string[] = [];

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(private dialogRef: MatDialogRef<LoginComponent>,
              private authService: AuthService,
              private webSocketService: WebSocketService,
              private toastr: ToastrService,
              private alarmService: AlarmService,){}

  login(): void {
    if (this.loginForm.valid){
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: value => {
          localStorage.setItem('user', JSON.stringify(value));
          this.authService.setUserLogged();
          this.dialogRef.close();
          this.initializeAlarmSocket();
        },
        error: err => alert(err.message)
      });
    }
  }

  private initializeAlarmSocket(): void {
    this.alarmService.alarmIdsState$.subscribe({
      next: value => this.alarmIds = value
    })

    this.alarmService.getAllUserAlarms(this.authService.getUserId()).subscribe({
      next: value => this.alarmService.setAlarmIdsState(value),
      error: err => alert(err.error.message)
    });

    this.webSocketService.startConnection("alarm");
    this.webSocketService.addDataListener(notification => {
      if (this.alarmIds.includes(notification.alarmId) && this.authService.isLoggedIn()) {
        console.log(notification.priority);
        this.toastr.success(notification.message, notification.title);
      }
    });
  }

}
