import { NgModule } from '@angular/core';
import {Class2RoutingModule} from './class-2-routing.module';
import {TranslateComponent} from './translate.component';
import {Translate2Component} from './translate2.component';




@NgModule({
  imports: [Class2RoutingModule],
  declarations: [TranslateComponent, Translate2Component],
  exports: [TranslateComponent]
})
export class Class2Module { }
