import { NgModule } from '@angular/core';
import {Class3RoutingModule} from './class-3-routing.module';
import {LookComponent} from './look.component';
import {SquaresComponent} from './squares.component';






@NgModule({
  imports: [Class3RoutingModule],
  declarations: [LookComponent, SquaresComponent]
})
export class Class3Module { }
