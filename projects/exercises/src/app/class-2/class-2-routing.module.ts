import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranslateComponent} from './translate.component';
import {Translate2Component} from './translate2.component';
import {CursorComponent} from './cursor.component';
import {Print10Component} from './print-10.component';

const routes: Routes = [
  { path: 'translate', component: TranslateComponent },
  { path: 'translate-2', component: Translate2Component },
  { path: 'cursor', component: CursorComponent },
  { path: 'print-10', component: Print10Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Class2RoutingModule { }
