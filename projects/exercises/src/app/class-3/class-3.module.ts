import { NgModule } from '@angular/core';
import {Class3RoutingModule} from './class-3-routing.module';
import {LookComponent} from './look.component';






@NgModule({
  imports: [Class3RoutingModule],
  declarations: [LookComponent],
  exports: [LookComponent]
})
export class Class3Module { }
