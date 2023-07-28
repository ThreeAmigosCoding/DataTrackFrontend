import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InputCreationComponent} from "./modules/home/input-creation/input-creation.component";
import {InputDisplayComponent} from "./modules/home/input-display/input-display.component";

const routes: Routes = [
  {path: 'input-creation', component: InputCreationComponent},
  {path: 'input-display', component: InputDisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
