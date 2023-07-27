import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {AnalogInput, Device, DigitalInput} from "../../../model/models";
import {AuthService} from "../../auth/auth.service";
import {InputService} from "../services/input.service";

@Component({
  selector: 'app-input-creation',
  templateUrl: './input-creation.component.html',
  styleUrls: ['./input-creation.component.css']
})
export class InputCreationComponent implements OnInit{

  tagType: string = "Analog";
  isDigital: boolean = false;
  simulationType: string = "SIMULATION";
  unit: string = "KELVIN";

  constructor(private authService: AuthService, private inputService: InputService) {
  }

  validateBound = (control: AbstractControl): {[key: string]: any} | null => {
    const lowerBound = this.tagForm?.get('lowerBound')?.value as number;
    const upperBound = control.value;

    if (lowerBound > upperBound) {
      return {validateBound: true};
    }

    return null;
  };

  validateLimit = (control: AbstractControl): {[key: string]: any} | null => {
    const lowerBound = this.tagForm?.get('lowLimit')?.value as number;
    const upperBound = control.value;

    if (lowerBound > upperBound) {
      return {validateLimit: true};
    }

    return null;
  };

  tagForm = new FormGroup({
    description: new FormControl("", [Validators.required]),
    lowLimit: new FormControl(0, [Validators.required]),
    highLimit: new FormControl(1, [Validators.required, this.validateLimit]),
    name: new FormControl("", [Validators.required]),
    lowerBound: new FormControl(0, [Validators.required]),
    upperBound: new FormControl(1, [Validators.required, this.validateBound]),
    scanTime: new FormControl(2000, [Validators.required, Validators.min(2000),
      Validators.max(10000)])
  });


  ngOnInit(): void {
  }

  changeType() {
    if (this.isDigital) {
      this.tagType = "Digital"
      this.tagForm.get("lowerBound")!.setValue(0);
      this.tagForm.get("upperBound")!.setValue(1);
      this.tagForm.get("lowLimit")!.setValue(0);
      this.tagForm.get("highLimit")!.setValue(1);
    }
    else
      this.tagType = "Analog"
  }

  createTag() {
    if (!this.tagForm.valid){
      return;
    }

    let device: Device = this.createDevice();
    if (this.isDigital){
      this.createDigitalInput(device);
    } else {
      this.createAnalogInput(device);
    }

  }

  createDevice(): Device {
    return {
      driver: this.simulationType,
      isDigital: this.isDigital,
      lowerBound: this.tagForm.get('lowerBound')?.value as number,
      name: this.tagForm.get('name')?.value as string,
      upperBound: this.tagForm.get('upperBound')?.value as number
    }
  }

  createDigitalInput(device: Device) {
    let digitalInput: DigitalInput = {
      createdBy: this.authService.getUserId(),
      description: this.tagForm.get('description')?.value as string,
      device: device,
      scanTime: this.tagForm.get('scanTime')?.value as number
    }

    this.inputService.createDigitalInput(digitalInput).subscribe({
      next: value => alert(value.message),
      error: err => alert(err.error.message)
    });
  }

  createAnalogInput(device: Device) {
    let analogInput: AnalogInput = {
      createdBy: this.authService.getUserId(),
      description: this.tagForm.get('description')?.value as string,
      device: device,
      highLimit: this.tagForm.get('highLimit')?.value as number,
      lowLimit: this.tagForm.get('lowLimit')?.value as number,
      scanTime: this.tagForm.get('scanTime')?.value as number ,
      unit: this.unit
    }

    this.inputService.createAnalogInput(analogInput).subscribe({
      next: value => alert(value.message),
      error: err => alert(err.error.message)
    });
  }

}
