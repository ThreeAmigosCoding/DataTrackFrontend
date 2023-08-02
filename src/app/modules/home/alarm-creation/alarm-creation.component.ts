import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Alarm, AlarmPriority, AlarmType, InputRecord} from "../../../model/models";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlarmService} from "../services/alarm.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-alarm-creation',
  templateUrl: './alarm-creation.component.html',
  styleUrls: ['./alarm-creation.component.css']
})
export class AlarmCreationComponent {

  constructor(private dialogRef: MatDialogRef<AlarmCreationComponent>,
              @Inject(MAT_DIALOG_DATA) public inputRecord: InputRecord,
              private alarmService: AlarmService,
              private snackBar: MatSnackBar,
              private authService: AuthService) {
  }

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

  initialAlarm: Alarm = {
    type: AlarmType.Lower,
    priority: AlarmPriority.Low,
    edgeValue: 0,
    unit: 'K',
    analogInputId: ''
  };

  alarmForm: FormGroup = new FormGroup({
    type: new FormControl(this.initialAlarm.type, Validators.required),
    priority: new FormControl(this.initialAlarm.priority, Validators.required),
    edgeValue: new FormControl(this.initialAlarm.edgeValue, [Validators.required, Validators.min(-1000),
      Validators.max(1000)]),
    unit: new FormControl({ value: this.unitDisplay(), disabled: true })
  });


  createAlarm(): void {
    if (!this.alarmForm.valid)
      return

    let alarmToCreate: Alarm = this.alarmForm.value as Alarm;
    alarmToCreate.analogInputId = this.inputRecord.inputId;
    alarmToCreate.unit = this.inputRecord.unit as string;
    console.log(alarmToCreate);
    this.alarmService.addAlarm(alarmToCreate).subscribe({
      next: value => {
        this.snackBar.open(value.message, "OK");
        this.updateAlarms();
        this.dialogRef.close();
      }, error: err => this.snackBar.open(err.message, "OK")
    })
  }

  updateAlarms() {
    this.alarmService.getAllUserAlarms(this.authService.getUserId()).subscribe({
      next: value => this.alarmService.setAlarmIdsState(value),
      error: err => this.snackBar.open(err.message)
    })
  }

  private unitDisplay(): string {
    switch (this.inputRecord.unit) {
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

}
