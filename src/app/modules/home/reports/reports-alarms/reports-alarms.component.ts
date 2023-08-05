import {Component, Input} from '@angular/core';
import {AlarmPriority, AlarmRecord, AlarmType, DateRange} from "../../../../model/models";
import {DatePipe} from "@angular/common";
import {AlarmService} from "../../services/alarm.service";

@Component({
  selector: 'app-reports-alarms',
  templateUrl: './reports-alarms.component.html',
  styleUrls: ['./reports-alarms.component.css']
})
export class ReportsAlarmsComponent {
  @Input() type: string = '';
  datePipe: DatePipe = new DatePipe('en-US');

  constructor(private alarmService: AlarmService) {
  }

  startDate: Date = new Date();
  endDate: Date = new Date();
  alarmRecordsByTime: AlarmRecord[] = []
  alarmRecordsByTimeColumns: string[] =
    ['Priority', 'Alarm ID', 'Type', 'Edge Value', 'Unit', 'Value', 'Recorded at', 'Input ID'];
  priority: AlarmPriority = AlarmPriority.Low;

  alarmTypeOptions = Object.keys(AlarmType)
    .filter(key => typeof AlarmType[key as keyof typeof AlarmType] === 'number')
    .map(key => ({
      value: AlarmType[key as keyof typeof AlarmType],
      viewValue: key
    }));

  alarmPriorityOptions = Object.keys(AlarmPriority)
    .filter(key => typeof AlarmPriority[key as keyof typeof AlarmPriority] === 'number')
    .map(key => ({
      value: AlarmPriority[key as keyof typeof AlarmPriority],
      viewValue: key
    }));

  public getAlarmRecordsByTime() {
    console.log(this.type);
    let dateRange: DateRange = {
      startTime: this.formatDateTime(this.startDate),
      endTime: this.formatDateTime(this.endDate ? this.endDate: this.startDate)
    }
    this.alarmService.getAlarmRecordsByTime(dateRange).subscribe({
      next: value => {
        this.alarmRecordsByTime = value;
        console.log(this.alarmRecordsByTime)
      },
      error: err => alert(err.message)
    })
  }

  getAlarmRecordsByPriority() {
    this.alarmService.getAlarmRecordsByPriority(this.priority).subscribe({
      next: value => {
        this.alarmRecordsByTime = value;
        console.log(this.alarmRecordsByTime)
      }, error: err => alert(err.message)
    })
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

  getPriorityColor(priority: number) {
    switch (priority) {
      case 0:
        return 'priority-0';
      case 1:
        return 'priority-1';
      case 2:
        return 'priority-2';
      default:
        return '';
    }  }

}
