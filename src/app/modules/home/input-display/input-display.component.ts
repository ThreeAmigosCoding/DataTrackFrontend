import {Component, OnInit} from '@angular/core';
import {InputRecord} from "../../../model/models";
import {WebSocketService} from "../services/web-socket.service";
import {InputService} from "../services/input.service";
import {AuthService} from "../../auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {AlarmCreationComponent} from "../alarm-creation/alarm-creation.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AlarmDisplayComponent} from "../alarm-display/alarm-display.component";
import {OutputComponent} from "./output/output.component";

@Component({
  selector: 'app-input-display',
  templateUrl: './input-display.component.html',
  styleUrls: ['./input-display.component.css']
})
export class InputDisplayComponent implements OnInit{

  analogInputs: InputRecord[] = [];
  digitalInputs: InputRecord[] = [];

  constructor(private webSocketService: WebSocketService,
              private inputService: InputService,
              public authService: AuthService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit() {

    this.webSocketService.startConnection("input");
    this.webSocketService.addDataListener(message =>{
      if (message.isDigital)
        this.updateDigitalInputs(message.inputId, message.value);
      else
        this.updateAnalogInputs(message.inputId, message.value);
    });

    this.inputService.getAllUserInputs(this.authService.getUserId()).subscribe({
      next: value => {
        console.log(value)
        value.map(item => {
          if (item.isDigital) this.digitalInputs.push(item);
          else this.analogInputs.push(item);
        })
      }, error: err => {
        alert(err.error.message)
      }
    })
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


  addAlarm(i: number) {
    this.dialog.open(AlarmCreationComponent, {data: this.analogInputs[i]});
  }

  switchAnalogInputState(i: number) {
    this.inputService.switchAnalogInputState(this.analogInputs[i].inputId).subscribe({
      next: value => {
        this.snackBar.open(value.message, "OK", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.analogInputs[i].scanOn = !this.analogInputs[i].scanOn;
      },
      error: err => alert(err.error.message)
    })
  }

  switchDigitalInputState(i: number) {
    this.inputService.switchDigitalInputState(this.digitalInputs[i].inputId).subscribe({
      next: value => {
        this.snackBar.open(value.message, "OK", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.digitalInputs[i].scanOn = !this.digitalInputs[i].scanOn;
      },
      error: err => alert(err.error.message)
    })
  }

  openAlarms(i: number) {
    this.dialog.open(AlarmDisplayComponent, {data: this.analogInputs[i]});
  }

  outputAnalog(i: number) {
    this.dialog.open(OutputComponent, {data: this.analogInputs[i]});
  }

  outputDigital(i: number) {
    this.dialog.open(OutputComponent, {data: this.digitalInputs[i]});
  }


}
