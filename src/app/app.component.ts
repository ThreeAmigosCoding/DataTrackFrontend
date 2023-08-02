import {Component, OnInit} from '@angular/core';
import {WebSocketService} from "./modules/home/services/web-socket.service";
import {AlarmService} from "./modules/home/services/alarm.service";
import {AuthService} from "./modules/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  private readonly notifier: NotifierService;
  title = 'DataTrackFrontend';
  alarmIds: string[] = [];

  constructor(private authService: AuthService,
              private webSocketService: WebSocketService,
              private alarmService: AlarmService,
              notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.initializeAlarmSocket();
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
        let message = notification.title + "\n" + notification.message;
        switch (notification.priority) {
          case 0:
            this.notifier.notify('default', message);
            break
          case 1:
            this.notifier.notify('warning', message);
            break
          case 2:
            this.notifier.notify('error', message);
            break
          default:
            this.notifier.notify('default', message);
            break
        }


        // this.snackBar.open(message, "Dismiss", {
        //   horizontalPosition: 'end',
        //   verticalPosition: 'bottom',
        // });
      }
    });
  }
}
