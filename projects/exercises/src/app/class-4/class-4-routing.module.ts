import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProximityComponent} from './proximity.component';
import {EyesComponent} from './eyes.component';

const routes: Routes = [
  { path: 'proximity', component: ProximityComponent },
  { path: 'eyes', component: EyesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Class4RoutingModule { }
