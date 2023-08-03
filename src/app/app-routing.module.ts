import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InputCreationComponent} from "./modules/home/input-creation/input-creation.component";
import {InputDisplayComponent} from "./modules/home/input-display/input-display.component";
import {WelcomeComponent} from "./modules/home/welcome/welcome.component";
import {ReportsComponent} from "./modules/home/reports/reports.component";

const routes: Routes = [
  {path: 'input-creation', component: InputCreationComponent},
  {path: 'input-display', component: InputDisplayComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'reports', component: ReportsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
