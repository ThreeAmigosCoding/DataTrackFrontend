import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InputCreationComponent} from "./modules/home/input-creation/input-creation.component";

const routes: Routes = [
  {path: 'input-creation', component: InputCreationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
