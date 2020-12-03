import { NgModule } from '@angular/core';
import {ProximityComponent} from './proximity.component';
import {Class4RoutingModule} from './class-4-routing.module';
import {EyesComponent} from './eyes.component';





@NgModule({
  imports: [Class4RoutingModule],
  declarations: [ProximityComponent, EyesComponent]
})
export class Class4Module { }
