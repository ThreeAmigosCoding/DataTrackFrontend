import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{
  reportType: string = "alarmsTime";
  ngOnInit(): void {
  }

}
