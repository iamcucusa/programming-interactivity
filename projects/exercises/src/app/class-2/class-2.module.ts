import { NgModule } from '@angular/core';
import {Class2RoutingModule} from './class-2-routing.module';
import {TranslateComponent} from './translate.component';
import {Translate2Component} from './translate2.component';
import {CursorComponent} from './cursor.component';




@NgModule({
  imports: [Class2RoutingModule],
  declarations: [TranslateComponent, Translate2Component, CursorComponent]
})
export class Class2Module { }
