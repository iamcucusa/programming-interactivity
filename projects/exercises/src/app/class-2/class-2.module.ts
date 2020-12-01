import { NgModule } from '@angular/core';
import {Class2RoutingModule} from './class-2-routing.module';
import {TranslateComponent} from './translate.component';
import {Translate2Component} from './translate2.component';
import {CursorComponent} from './cursor.component';
import {Print10Component} from './print-10.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {CommonModule} from '@angular/common';




@NgModule({
  imports: [Class2RoutingModule, CommonModule, NzButtonModule],
  declarations: [TranslateComponent, Translate2Component, CursorComponent, Print10Component]
})
export class Class2Module { }
