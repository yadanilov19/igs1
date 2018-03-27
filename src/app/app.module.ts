import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {KonvaModule} from 'ng2-konva';
import { DrawPlaceComponent } from './components/draw-place/draw-place.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawPlaceComponent
  ],
  imports: [
    BrowserModule,
    KonvaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
