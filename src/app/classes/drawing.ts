import {TransformMatrix} from './transform-matrix';
import {HomogenPoint} from './homogen-point';
import {Polygon} from './polygon';
import {ShapeBase} from './shapes';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import {isNullOrUndefined} from 'util';
import {Utils} from "./utils";

export class Drawing {
  matrix: TransformMatrix = TransformMatrix.Identity();
  points: HomogenPoint[][];
  polygons: Polygon[];
  shape: ShapeBase;
  rotateMatrix: TransformMatrix = TransformMatrix.Identity();
  scaleMatrix: TransformMatrix = TransformMatrix.Identity();
  width = 900;
  height = 900;
  frontColor = {
    R: 123,
    G: 255,
    B: 255
  };
  backColor = {
    R: 255,
    G: 0,
    B: 255
  };

  set Width(value) {
    this.width = value;
  }

  set Height(value) {
    this.height = value;
  }

  Params: {
    IsFlat: boolean,
    zIsSort: boolean
  } = {IsFlat: true, zIsSort: true};

  constructor(shape: ShapeBase) {
    this.shape = shape;
    this.createPointsAndPolygons();
    this.calculatePoints();
  }

  scale(val: number) {
    this.scaleMatrix = TransformMatrix.Multipy(TransformMatrix.Deformation(val, val, val), this.scaleMatrix);
    this.calculatePoints();
  }

  rotate(val: { x: number, y: number, z: number }) {
    if (!isNullOrUndefined(val.x)) {
      this.rotateMatrix = TransformMatrix.Multipy(this.rotateMatrix, TransformMatrix.RotateOX(val.x));
    }
    if (!isNullOrUndefined(val.y)) {
      this.rotateMatrix = TransformMatrix.Multipy(this.rotateMatrix, TransformMatrix.RotateOY(val.y));
    }
    this.calculatePoints();
  }

  calculatePoints() {
    this.createMatrix();
    for (let i = 0; i < this.shape.uCount; ++i) {
      for (let j = 0; j < this.shape.vCount; ++j) {
        this.points[i][j].setPoint(HomogenPoint.ApplyTrasformMatrix(this.shape.func(i, j), this.matrix));
      }
    }
    if (this.Params.IsFlat && this.Params.zIsSort) {
      this.sortPolygons();
    }
  }

  sortPolygons() {
    this.polygons = _.sortBy(this.polygons, (data) => data.getZ());
  }

  createMatrix() {
    this.matrix =
      TransformMatrix.Multipy(
        this.scaleMatrix,
        TransformMatrix.Multipy(
          this.rotateMatrix,
          TransformMatrix.Multipy(
            TransformMatrix.ReflectionX(),
            TransformMatrix.Move(new HomogenPoint(this.width / 2, this.height / 2, 0)))));
    // console.log(this.matrix);
  }

  createPointsAndPolygons() {
    this.points = [];
    this.polygons = [];
    for (let i = 0; i < this.shape.uCount; ++i) {
      this.points.push([]);
      for (let j = 0; j < this.shape.vCount; ++j) {
        this.points[i][j] = new HomogenPoint(1, 1, 1);
        if (i > 0 && j > 0) {
          this.polygons.push(new Polygon(this.points[i - 1][j - 1], this.points[i - 1][j], this.points[i][j - 1]));
          this.polygons.push(new Polygon(this.points[i][j - 1], this.points[i - 1][j], this.points[i][j]));
        }
      }
    }
  }

  changeSize(w, h) {
    this.width = w;
    this.height = h;
    this.calculatePoints();
  }

  changeType(_isFlat, _zIsSort) {
    this.Params.IsFlat = _isFlat;
    this.Params.zIsSort = _zIsSort;
    this.calculatePoints();
  }

  getColor(polygon: Polygon) {
    let cos = polygon.getCos();
    let col = this.frontColor;
    if (cos < 0) {
      col = this.backColor;
      cos = -cos;
    }
    const r = (col.R * cos);
    const g = (col.G * cos);
    const b = (col.B * cos);
    return Utils.rgbToHex(r, g, b);
  }

  draw(cxt: CanvasRenderingContext2D) {
    cxt.clearRect(0, 0, this.width, this.height);
    for (const polygon of this.polygons) {
      const viewPoints = {
        a: polygon.a.ToPoint2d,
        b: polygon.b.ToPoint2d,
        c: polygon.c.ToPoint2d
      };
      // console.log(viewPoints);
      cxt.beginPath();
      cxt.moveTo(viewPoints.a.X, viewPoints.a.Y);
      cxt.lineTo(viewPoints.b.X, viewPoints.b.Y);
      cxt.lineTo(viewPoints.c.X, viewPoints.c.Y);
      cxt.lineTo(viewPoints.a.X, viewPoints.a.Y);
      cxt.closePath();
      // console.log(polygon);
      // special Konva.js method
      if (this.Params.IsFlat) {
        cxt.lineWidth = 1;
        cxt.fillStyle = this.getColor(polygon);
        cxt.strokeStyle = this.getColor(polygon);
        cxt.fill();
      }

      cxt.stroke();

      // cxt.clip('evenodd');
    }
  }
}
