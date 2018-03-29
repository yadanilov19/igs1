import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShapeService} from '../../services/shape/shape.service';
import {ShapeBase} from '../../../classes/shapes';

@Component({
  selector: 'app-segments-params',
  templateUrl: './segments-params.component.html',
  styleUrls: ['./segments-params.component.css']
})
export class SegmentsParamsComponent implements OnInit {
  SegmentsParams = {
    u: {
      min: 0,
      value: 360,
      max: 360,
      count: 20,
      maxCount: 100
    },
    v: {
      min: 0,
      value: 360,
      max: 360,
      count: 20,
      maxCount: 100
    }
  };

  constructor(private sh: ShapeService) {
    const shape = sh.CurrentShape.value;
    this.SegmentsParams = {
      u: {
        min: shape.uMin,
        value: shape.uInitMax,
        max: shape.uMax,
        count: shape.uCount,
        maxCount: 50
      },
      v: {
        min: shape.vMin,
        value: shape.vInitMax,
        max: shape.vMax,
        count: shape.vCount,
        maxCount: 50
      }
    };
  }

  ngOnInit() {
    this.sh.ShapeChange.subscribe((shape) => {
      this.SegmentsParams = {
        u: {
          min: shape.value.uMin,
          value: shape.value.uMax,
          max: shape.value.uInitMax,
          count: shape.value.uCount,
          maxCount: 50
        },
        v: {
          min: shape.value.vMin,
          value: shape.value.vMax,
          max: shape.value.vInitMax,
          count: shape.value.vCount,
          maxCount: 50
        }
      };
    });
  }

  SendEvent() {
    this.sh.SegmentsParams.next(this.SegmentsParams);
  }

}
