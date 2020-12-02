import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LookComponent} from './look.component';


const routes: Routes = [
  { path: 'look', component: LookComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Class3RoutingModule { }
