import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {KonvaModule} from 'ng2-konva';
import { DrawPlaceComponent } from './components/draw-place/draw-place.component';
import {RouterModule, Routes} from '@angular/router';
import { ControlsComponent } from './components/controls/controls.component';
const appRoutes: Routes = [
  { path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    DrawPlaceComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    KonvaModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
