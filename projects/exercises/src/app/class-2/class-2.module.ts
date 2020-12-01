import { NgModule } from '@angular/core';
import {Class2RoutingModule} from './class-2-routing.module';
import {TranslateComponent} from './translate.component';




@NgModule({
  imports: [Class2RoutingModule],
  declarations: [TranslateComponent],
  exports: [TranslateComponent]
})
export class Class2Module { }
