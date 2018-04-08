import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/switchMap';

import {Drawing} from '../../classes/drawing';
import {Paraboloid, Tor} from '../../classes/shapes';
import {ActivatedRoute} from '@angular/router';
import {ShapeService} from '../services/shape/shape.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-draw-place',
  templateUrl: './draw-place.component.html',
  styleUrls: ['./draw-place.component.css']
})
export class DrawPlaceComponent implements OnInit, AfterViewInit {
  public drawBehaviour: Drawing;
  @ViewChild('myCanvas') canvasRef: ElementRef;
  @Input() width = 900;
  @Input() height = 900;

  ngAfterViewInit(): void {
    this.drawing();
  }

  constructor(private shapeService: ShapeService) {
    this.shapeService.ShapeChange.next(this.shapeService.CurrentShape);
  }

  drawing(rotation?: { x: number, y: number, z: number }, axis?: boolean) {
    if (isNullOrUndefined(rotation)) {
      rotation = {x: 0, y: 0, z: 0};
    }
    if (axis) {
      this.drawBehaviour.rotateAxis(rotation);
    } else {
      this.drawBehaviour.rotate(rotation);
    }

    const ctx: CanvasRenderingContext2D =
      this.canvasRef.nativeElement.getContext('2d');
    this.drawBehaviour.Height = this.height;
    this.drawBehaviour.Width = this.width;

    this.drawBehaviour.draw(ctx);
  }

  ngOnInit(): void {
    this.captureEvents(this.canvasRef.nativeElement);


    this.drawBehaviour = new Drawing(this.shapeService.CurrentShape.value);
    this.shapeService.ShapeChange.subscribe(shape => {
      this.drawBehaviour.ChangeShape = shape.value;
      this.drawing();
    });
    this.shapeService.FillParams.subscribe(fillParams => {
      this.drawBehaviour.SetParams(fillParams);
      this.drawing();
    });
    this.shapeService.PlaceParams.subscribe(pp => {
      this.drawBehaviour.shape.a = pp.a.cur;
      this.drawBehaviour.shape.b = pp.b.cur;
      this.drawing();
    });
    this.shapeService.ColorChange.subscribe(color => {
      this.drawBehaviour.Colors = color;
      this.drawing();
    });
    this.shapeService.SegmentsParams.subscribe(sp => {
      this.drawBehaviour.shape.vCount = sp.v.count;
      this.drawBehaviour.shape.uCount = sp.u.count;
      this.drawBehaviour.shape.uMax = sp.u.value;
      this.drawBehaviour.shape.vMax = sp.v.value;
      this.drawBehaviour.Init(this.drawBehaviour.shape);
      this.drawing();
    });
    this.shapeService.axisMoveChange.subscribe(sp => {
      this.drawing(sp, true);
    });
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    // move
    Observable
      .fromEvent(canvasEl, 'mousedown')
      .switchMap((e) => {
        return Observable
          .fromEvent(canvasEl, 'mousemove')
          .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
          .takeUntil(Observable.fromEvent(canvasEl, 'mouseleave'))
          .pairwise();
      })
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          y: -((res[1].clientX - rect.left) - prevPos.x) / 2,
          x: -((res[1].clientY - rect.top) - prevPos.y) / 2,
          z: 0
        };
        this.drawing(currentPos);
      });

    // scale
    Observable.fromEvent(canvasEl, 'mousewheel')
      .subscribe((e: MouseWheelEvent) => {
        this.drawBehaviour.scale(e.deltaY > 0 ? 0.9 : 1.1);
        this.drawing({x: 0, y: 0, z: 0});
      });
  }
}
