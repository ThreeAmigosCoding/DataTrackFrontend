import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule
  ],
  exports:[
    NavBarComponent
  ]
})
export class HomeModule { }
