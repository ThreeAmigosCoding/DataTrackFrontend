import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {} from "@microsoft/signalr"
import { InputCreationComponent } from './input-creation/input-creation.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { InputDisplayComponent } from './input-display/input-display.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import { WelcomeComponent } from './welcome/welcome.component';
import { AlarmCreationComponent } from './alarm-creation/alarm-creation.component';
import { AlarmDisplayComponent } from './alarm-display/alarm-display.component';
import { ReportsComponent } from './reports/reports.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { ReportsAlarmsComponent } from './reports/reports-alarms/reports-alarms.component';
import { InputsReportsStaticComponent } from './reports/inputs-reports-static/inputs-reports-static.component';
import {MatSortModule} from "@angular/material/sort";




@NgModule({
  declarations: [
    NavBarComponent,
    InputCreationComponent,
    InputDisplayComponent,
    WelcomeComponent,
    AlarmCreationComponent,
    AlarmDisplayComponent,
    ReportsComponent,
    ReportsAlarmsComponent,
    InputsReportsStaticComponent
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatListModule,
    NgOptimizedImage,
    MatButtonToggleModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule
  ],
    exports: [
        NavBarComponent,
        AlarmCreationComponent
    ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class HomeModule { }
