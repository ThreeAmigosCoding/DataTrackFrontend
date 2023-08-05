import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InputRecord} from "../../../../model/models";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OutputService} from "../../services/output.service";

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit{

  value: number = 0;

  constructor(private dialogRef: MatDialogRef<OutputComponent>,
              @Inject(MAT_DIALOG_DATA) public inputRecord: InputRecord,
              private snackBar: MatSnackBar,
              private outputService: OutputService) {
  }

  ngOnInit() {
    this.value = this.inputRecord.value;
  }

  applyOutputValue() {
    if (this.inputRecord.isDigital) {
      this.outputService.changeDigitalOutputValue(this.inputRecord.ioAddress, 0).subscribe({
        next: value => {
          this.snackBar.open(value.message, "OK", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
        },
        error: err => alert(err.message)
      })
    }
    else {
      this.outputService.changeAnalogOutputValue(this.inputRecord.ioAddress, this.value).subscribe({
        next: value => {
          this.snackBar.open(value.message, "OK", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
        },
        error: err => alert(err.message)
      })
    }
    this.dialogRef.close();
  }

  onSelectChange(event: any) {
    const selectedValue = event.value;
    this.value = +selectedValue;
  }
}
