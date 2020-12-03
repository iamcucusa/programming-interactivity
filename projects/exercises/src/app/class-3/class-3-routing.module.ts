import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LookComponent} from './look.component';
import {SquaresComponent} from './squares.component';


const routes: Routes = [
  { path: 'look', component: LookComponent },
  { path: 'squares', component: SquaresComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Class3RoutingModule { }
