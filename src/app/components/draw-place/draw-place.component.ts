import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/switchMap';

import {Drawing} from '../../classes/drawing';
import {Paraboloid, Tor} from '../../classes/shapes';
import {ActivatedRoute} from '@angular/router';

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
    this.drawing({x: 0, y: 0, z: 0});
  }

  constructor(private activateRoute: ActivatedRoute) {
    this.drawBehaviour = new Drawing(new Paraboloid());
  }

  drawing(rotation: { x: number, y: number, z: number }) {
    this.drawBehaviour.rotate(rotation);
    const ctx: CanvasRenderingContext2D =
      this.canvasRef.nativeElement.getContext('2d');
    this.drawBehaviour.Height = this.height;
    this.drawBehaviour.Width = this.width;

    this.drawBehaviour.draw(ctx);
  }

  ngOnInit(): void {
    this.captureEvents(this.canvasRef.nativeElement);

    this.activateRoute.params.subscribe(params => {
      console.log(params);
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
          .pairwise()
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
