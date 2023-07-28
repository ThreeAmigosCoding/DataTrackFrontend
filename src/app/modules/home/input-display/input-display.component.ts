import {Component, OnInit} from '@angular/core';
import {InputRecord} from "../../../model/models";
import {WebSocketService} from "../services/web-socket.service";

@Component({
  selector: 'app-input-display',
  templateUrl: './input-display.component.html',
  styleUrls: ['./input-display.component.css']
})
export class InputDisplayComponent implements OnInit{

  analogInputs: InputRecord[] = [
    {
      inputId: "62ace9b9-bea0-4933-f9ed-08db8f81684b",
      ioAddress: "AIO789",
      description: "Analog Input 1 description",
      value: 10.5,
      driver: "Driver C",
      deviceName: "Device Z",
      scanOn: true,
      unit: "K",
      isDigital: false
    },
  ];
  digitalInputs: InputRecord[] = [
    {
      inputId: "2c3fcff1-549c-4e64-3202-08db8f80f6a7",
      ioAddress: "IO123",
      description: "Input 1 description",
      value: 1,
      driver: "Driver A",
      deviceName: "Device X",
      scanOn: true,
      isDigital: true
    },
    {
      inputId: "40762c45-a7b0-4b29-a106-08db8f819cd2",
      ioAddress: "IO456",
      description: "Input 2 description",
      value: 0,
      driver: "Driver B",
      deviceName: "Device Y",
      scanOn: false,
      isDigital: true
    },
  ]

  constructor(private webSocketService: WebSocketService) {
  }

  ngOnInit() {

    this.webSocketService.startConnection();
    this.webSocketService.addDataListener(message =>{
      if (message.isDigital)
        this.updateDigitalInputs(message.inputId, message.value);
      else
        this.updateAnalogInputs(message.inputId, message.value);
    });

  }

  updateDigitalInputs(id: string, value: number): void {
    this.digitalInputs = this.digitalInputs.map(item => {
      if (item.inputId == id)
        item.value = value
      return item;
    });
  }

  updateAnalogInputs(id: string, value: number): void {
    this.analogInputs = this.analogInputs.map((item) => {
      if (item.inputId == id)
        item.value = value
      return item;
    });
  }



}
