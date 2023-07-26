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
  
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5157/socket/input', {withCredentials: true})
    .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))

    
  }

  public addTransferChartDataListener = () => {
    this.hubConnection?.on('ReceiveDigitalData', (message) => {
      console.log({message});
      // Implement your logic to handle received messages
    });
  }


}
