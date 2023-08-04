import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {DateRange, InputRecord} from "../../../../model/models";
import {InputService} from "../../services/input.service";

@Component({
  selector: 'app-inputs-reports-static',
  templateUrl: './inputs-reports-static.component.html',
  styleUrls: ['./inputs-reports-static.component.css']
})
export class InputsReportsStaticComponent implements OnInit{

  @Input() type: string = "";
  datePipe: DatePipe = new DatePipe('en-US');

  constructor(private inputService: InputService) {
  }

  startDate: Date = new Date();
  endDate: Date = new Date();

  inputRecords: InputRecord[] = [];

  inputIds: string[] = ['0ab89c20-e895-4b64-b15e-08db94415d51'];
  inputId: string = '0ab89c20-e895-4b64-b15e-08db94415d51';
  ngOnInit() {
    if (this.type === 'inputRecordTime') return;
    //poziv na bek za dobavaljanje svih id-jeva

  }

  inputRecordsColumns: string[] =
    ['Input ID', 'IO Address', 'Type', 'Value', 'Unit', 'Recorded at']

  formatDateTime(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss') || '';
  }

  getInputRecordsByTime() {
    let dateRange: DateRange = {
      startTime: this.formatDateTime(this.startDate),
      endTime: this.formatDateTime(this.endDate ? this.endDate: this.startDate)
    }
    this.inputService.getInputsByTime(dateRange).subscribe({
      next: value => this.inputRecords = value,
      error: err => alert(err.message)
    });
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

  getInputRecordsById() {
    this.inputService.getInputsById(this.inputId).subscribe({
      next: value => this.inputRecords = value,
      error: err => alert(err.message)
    });
  }
}
