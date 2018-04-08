import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {KonvaModule} from 'ng2-konva';
import { DrawPlaceComponent } from './components/draw-place/draw-place.component';
import {RouterModule, Routes} from '@angular/router';
import { ControlsComponent } from './components/controls/controls.component';
import {ColorSelectorComponent} from './components/controls/color-selector/color-selector.component';
import {PlaceParamsComponent} from './components/controls/place-params/place-params.component';
import {FillParamsComponent} from './components/controls/fill-params/fill-params.component';
import {SegmentsParamsComponent} from './components/controls/segments-params/segments-params.component';

import {FormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/components/dropdown/dropdown';
import {ShapeSelectorComponent} from './components/controls/shape-selector/shape-selector.component';
import {ShapeService} from './components/services/shape/shape.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CheckboxModule, ColorPickerModule, RadioButtonModule, SliderModule} from 'primeng/primeng';
import {MoveByAxisComponent} from './components/controls/move-by-axis/move-by-axis.component';

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
    ControlsComponent,
    ColorSelectorComponent,
    PlaceParamsComponent,
    FillParamsComponent,
    SegmentsParamsComponent,
    ShapeSelectorComponent,
    MoveByAxisComponent
  ],
  imports: [
    BrowserModule,
    DropdownModule,
    BrowserAnimationsModule,
    FormsModule,
    CheckboxModule,
    ColorPickerModule,
    RadioButtonModule,
    SliderModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ShapeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
