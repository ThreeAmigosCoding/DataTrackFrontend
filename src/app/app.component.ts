import {Component, OnInit} from '@angular/core';
import {WebSocketService} from "./modules/home/services/web-socket.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DataTrackFrontend';

  constructor(private webSocketService: WebSocketService,
              private toastr: ToastrService) {

  }

  // TODO: prikazivati samo odredjenim userima
  ngOnInit(): void {
    this.webSocketService.startConnection("alarm");
    this.webSocketService.addDataListener(notification => {
     console.log(notification.priority)
      this.toastr.success(notification.message, notification.title)
    });
  }
}
