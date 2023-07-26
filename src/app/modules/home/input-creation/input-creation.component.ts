import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

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

  }
}
