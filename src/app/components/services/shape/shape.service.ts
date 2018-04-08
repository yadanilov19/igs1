import {Injectable} from '@angular/core';
import {Astroida, Cone, Elipsoid, Paraboloid, Tor} from '../../../classes/shapes';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ShapeService {
  AvalibleShapes = [
    {
      name: 'Параболоид',
      value: new Paraboloid()
    },
    {
      name: 'Элипсоид',
      value: new Elipsoid()
    },
    {
      name: 'Тор',
      value: new Tor()
    },
    {
      name: 'Конус',
      value: new Cone()
    },
    // {
    //   name: 'Астроида',
    //   value: new Astroida()
    // }
  ];
  CurrentShape = this.AvalibleShapes[0];
  ShapeChange: Subject<any> = new Subject();
  FillParams: Subject<any> = new Subject();
  PlaceParams: Subject<any> = new Subject();
  ColorChange: Subject<any> = new Subject();
  SegmentsParams: Subject<any> = new Subject();
  axisMoveChange: Subject<{ x: number, y: number, z: number }> = new Subject();

  constructor() {
    this.ShapeChange.subscribe(shape => this.CurrentShape = shape);
  }
}
