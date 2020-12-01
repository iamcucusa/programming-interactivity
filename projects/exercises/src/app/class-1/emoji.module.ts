import { NgModule } from '@angular/core';
import {EmojiRoutingModule} from './emoji-routing.module';
import {EmojiComponent} from './emoji.component';




@NgModule({
  imports: [EmojiRoutingModule],
  declarations: [EmojiComponent],
  exports: [EmojiComponent]
})
export class EmojiModule { }
