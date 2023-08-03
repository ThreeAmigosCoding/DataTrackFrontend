import {Component, Inject, OnInit} from '@angular/core';
import {AlarmDisplay, AlarmPriority, AlarmType, AnalogInput, InputRecord} from "../../../model/models";
import {AlarmService} from "../services/alarm.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-alarm-display',
  templateUrl: './alarm-display.component.html',
  styleUrls: ['./alarm-display.component.css']
})
export class AlarmDisplayComponent implements OnInit{
  alarms: AlarmDisplay[] = []

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

  constructor(private alarmService: AlarmService, private dialogRef: MatDialogRef<AlarmDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) public analogInputRecord: InputRecord, private snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.alarmService.getInputAlarms(this.analogInputRecord.inputId).subscribe({
      next: value => {
        this.alarms = value;
      },
      error: err => alert(err.message)
    })
  }

  deleteAlarm(i: number) {
    this.alarmService.deleteAlarm(this.alarms[i].id).subscribe({
      next: value => {
        this.snackBar.open(value.message, "OK", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.alarms.splice(i, 1);
      },
      error: err => alert(err.message)
    })
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
    }
  }
}
