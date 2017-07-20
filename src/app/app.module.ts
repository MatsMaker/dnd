import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DragAndDropModule} from 'angular-draggable-droppable';

import { AppComponent } from './app.component';
import { TrunkComponent } from './trunk/trunk.component';

@NgModule({
  declarations: [
    AppComponent, TrunkComponent
  ],
  imports: [
    BrowserModule, DragAndDropModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
