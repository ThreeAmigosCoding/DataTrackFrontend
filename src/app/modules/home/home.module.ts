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



@NgModule({
  declarations: [
    NavBarComponent,
    InputCreationComponent,
    InputDisplayComponent,
    WelcomeComponent,
    AlarmCreationComponent
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
  ],
    exports: [
        NavBarComponent,
        AlarmCreationComponent
    ]
})
export class HomeModule { }
