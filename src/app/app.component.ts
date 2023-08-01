import {Component, OnInit} from '@angular/core';
import {WebSocketService} from "./modules/home/services/web-socket.service";
import {ToastrService} from "ngx-toastr";
import {AlarmService} from "./modules/home/services/alarm.service";
import {AuthService} from "./modules/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DataTrackFrontend';
  constructor() {

  }

}
