import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AuthService } from '../../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private hubConnection: signalR.HubConnection | undefined;

  constructor(public authService: AuthService) {
  }

  public startConnection = (connectionName: string) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5157/socket/' + connectionName, {withCredentials: true})
    .build();

    this.hubConnection
      .start()
      .then(() => console.log(connectionName + ' connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addDataListener = (callback:(message: any) => void) => {
    this.hubConnection?.on('ReceiveData', (message) => {
      callback(message);
      // Implement your logic to handle received messages
    });
  }

  public stopConnection = () => {
    if (this.hubConnection) {
      this.hubConnection.stop()
        .then(() => console.log('Connection stopped'))
        .catch(err => console.log('Error while stopping connection: ' + err));
    }
  }

}
