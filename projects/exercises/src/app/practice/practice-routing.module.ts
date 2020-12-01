import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Breakout2DComponent} from './2d-breakout.component';

const routes: Routes = [
  { path: '2d-breakout', component: Breakout2DComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticeRoutingModule { }
