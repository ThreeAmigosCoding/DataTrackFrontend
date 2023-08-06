import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DatePipe} from "@angular/common";
import {InputRecord} from "../../../../model/models";
import {WebSocketService} from "../../services/web-socket.service";
import {InputService} from "../../services/input.service";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-input-reports-dynamic',
  templateUrl: './input-reports-dynamic.component.html',
  styleUrls: ['./input-reports-dynamic.component.css']
})
export class InputReportsDynamicComponent implements OnInit{

  @Input() type: string = "";
  datePipe: DatePipe = new DatePipe('en-US');
  inputRecordsColumns: string[] = ['Input ID', 'Device name', 'IO Address', 'Value', 'Unit', 'Recorded at'];
  inputRecords: InputRecord[] = [];

  constructor(private webSocketService: WebSocketService,
              private inputService: InputService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.webSocketService.startConnection("input");
    this.webSocketService.addDataListener(message => {
      this.updateInputs(message.inputId, message.value, message.recordedAt);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.inputRecords = [];
    this.getAllUserInputs();
  }

  formatDateTime(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss') || '';
  }

  public unitDisplay(unit: string): string {
    switch (unit) {
      case "C":
        return "Celsius";
      case "F":
        return "Fahrenheit";
      case "K":
        return "Kelvin";
      default:
        return ""
    }
  }

  updateInputs(id: string, value: number, recordedAt: Date): void {
    this.inputRecords = this.inputRecords.map((item) => {
      if (item.inputId == id) {
        item.value = value;
        item.recordedAt = recordedAt;
      }
      return item;
    });
  }

  getAllUserInputs() {
    this.inputService.getAllUserInputs(this.authService.getUserId()).subscribe({
      next: value => {
        this.inputRecords = value.filter(item => {
          if (this.type === "digitalTags" && item.isDigital)
            return item;
          else if (this.type === "analogTags" && !item.isDigital)
            return item;
          return
        })
      }, error: err => {
        alert(err.error.message)
      }
    });
    console.log(this.inputRecords)
  }

}
