import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranslateComponent} from './translate.component';
import {Translate2Component} from './translate2.component';
import {CursorComponent} from './cursor.component';

const routes: Routes = [
  { path: 'translate', component: TranslateComponent },
  { path: 'translate-2', component: Translate2Component },
  { path: 'cursor', component: CursorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Class2RoutingModule { }
