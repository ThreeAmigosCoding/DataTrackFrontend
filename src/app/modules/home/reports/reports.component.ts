import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatButtonToggle} from "@angular/material/button-toggle";


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, AfterViewInit {
  @ViewChild('alarmButtonTime') alarmButtonTime!: MatButtonToggle;
  reportType: string = "alarmsTime";

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.alarmButtonTime.checked = true;
  }

}
