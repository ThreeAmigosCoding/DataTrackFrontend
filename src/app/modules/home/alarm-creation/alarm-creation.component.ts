import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Alarm, AlarmPriority, AlarmType} from "../../../model/models";

@Component({
  selector: 'app-alarm-creation',
  templateUrl: './alarm-creation.component.html',
  styleUrls: ['./alarm-creation.component.css']
})
export class AlarmCreationComponent {

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
    unit: new FormControl(this.initialAlarm.unit, [Validators.required])
  });


  createAlarm(): void {
    if (!this.alarmForm.valid)
      return

    let alarmToCreate: Alarm = this.alarmForm.value as Alarm;
    //postaviti vrednost analogInputId-a ovde
    alarmToCreate.analogInputId = "analogInputId";
    console.log(alarmToCreate);
    //poslati request za kreiranje alarma ovde
  }

}
