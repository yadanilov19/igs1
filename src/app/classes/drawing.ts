import {TransformMatrix} from './transform-matrix';
import {HomogenPoint} from './homogen-point';
import {Polygon} from './polygon';
import {ShapeBase} from './shapes';
import * as _ from 'lodash';

import 'rxjs/add/observable/of';
import {isNullOrUndefined} from 'util';
import {Utils} from './utils';
import {FillTypes} from './fill-types.enum';

export class Drawing {
  matrix: TransformMatrix = TransformMatrix.Identity();
  points: HomogenPoint[][];
  polygons: Polygon[];
  shape: ShapeBase;
  rotateMatrix: TransformMatrix = TransformMatrix.Identity();
  rotateAxisMatrix: TransformMatrix = TransformMatrix.Identity();
  scaleMatrix: TransformMatrix = TransformMatrix.Identity();
  width = 800;
  height = 800;
  axis: any;

  Colors = {
    front: {
      r: 0,
      g: 0,
      b: 0
    },
    back: {
      r: 0,
      g: 0,
      b: 0
    }
  };

  set Width(value) {
    this.width = value;
  }

  set Height(value) {
    this.height = value;
  }

  set ChangeShape(shape) {
    this.Init(shape);
  }

  Params: {
    type: FillTypes
  }
    = {type: FillTypes.Stroke};

  constructor(shape: ShapeBase) {
    this.Init(shape);
  }

  Init(shape) {
    this.shape = shape;
    this.createAxis();
    this.createPointsAndPolygons();
    this.calculatePoints();
  }

  scale(val: number) {
    this.scaleMatrix = TransformMatrix.Multipy(TransformMatrix.Deformation(val, val, val), this.scaleMatrix);
    this.calculatePoints();
  }

  rotate(val: {
    x: number, y: number, z: number
  }) {
    if (!isNullOrUndefined(val.x)) {
      this.rotateMatrix = TransformMatrix.Multipy(this.rotateMatrix, TransformMatrix.RotateOX(val.x));
    }
    if (!isNullOrUndefined(val.y)) {
      this.rotateMatrix = TransformMatrix.Multipy(this.rotateMatrix, TransformMatrix.RotateOY(val.y));
    }
    if (!isNullOrUndefined(val.z)) {
      this.rotateMatrix = TransformMatrix.Multipy(this.rotateMatrix, TransformMatrix.RotateOZ(val.z));
    }
    this.calculatePoints();
  }

  rotateAxis(val: {
    x: number, y: number, z: number
  }) {
    this.rotateAxisMatrix = TransformMatrix.Identity();
    if (!isNullOrUndefined(val.x)) {
      this.rotateAxisMatrix = TransformMatrix.Multipy(this.rotateAxisMatrix, TransformMatrix.RotateOX(val.x));
    }
    if (!isNullOrUndefined(val.y)) {
      this.rotateAxisMatrix = TransformMatrix.Multipy(this.rotateAxisMatrix, TransformMatrix.RotateOY(val.y));
    }
    if (!isNullOrUndefined(val.z)) {
      this.rotateAxisMatrix = TransformMatrix.Multipy(this.rotateAxisMatrix, TransformMatrix.RotateOZ(val.z));
    }
    this.calculatePoints();
  }

  calculatePoints() {
    this.createMatrix();
    this.calculateAxisPoints();
    for (let i = 0; i < this.shape.uCount; ++i) {
      for (let j = 0; j < this.shape.vCount; ++j) {
        this.points[i][j].setPoint(HomogenPoint.ApplyTrasformMatrix(this.shape.func(i, j), this.matrix));
      }
    }
    if (this.Params.type === FillTypes.FlatWithSort) {
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
          this.rotateAxisMatrix,
          TransformMatrix.Multipy(
            this.rotateMatrix,
            TransformMatrix.Multipy(
              TransformMatrix.ReflectionX(),
              TransformMatrix.Move(new HomogenPoint(this.width / 2, this.height / 2, 0))))));
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

  // changeSize(w, h) {
  //   this.width = w;
  //   this.height = h;
  //   this.calculatePoints();
  // }

  SetParams(params) {
    this.Params = params;
    this.calculatePoints();
  }

  getColor(polygon: Polygon) {
    let cos = polygon.getCos();
    let col = this.Colors.front;
    if (cos < 0) {
      col = this.Colors.back;
      cos = -cos;
    }
    const r = (col.r * cos);
    const g = (col.g * cos);
    const b = (col.b * cos);
    return Utils.rgbToHex(r, g, b);
  }

  draw(cxt: CanvasRenderingContext2D) {
    cxt.clearRect(0, 0, this.width, this.height);


    this.drawAxises(cxt);
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
      switch (this.Params.type) {
        case FillTypes.Flat:
          cxt.lineWidth = 1;
          cxt.fillStyle = this.getColor(polygon);
          cxt.strokeStyle = this.getColor(polygon);
          cxt.stroke();
          cxt.fill();
          break;
        case FillTypes.FlatWithSort:
          cxt.lineWidth = 1;
          cxt.fillStyle = this.getColor(polygon);
          cxt.strokeStyle = this.getColor(polygon);
          cxt.stroke();
          cxt.fill();
          break;
        case FillTypes.Stroke:
          cxt.strokeStyle = '#000';
          cxt.stroke();
          break;
      }
    }
  }

  private createAxis() {
    this.axis = {
      zero: new HomogenPoint(0, 0, 0),
      x: new HomogenPoint(1, 0, 0, 0),
      y: new HomogenPoint(0, 1, 0, 0),
      z: new HomogenPoint(0, 0, 1, 0)
    };
  }


  private drawAxises(cxt: CanvasRenderingContext2D) {
    cxt.beginPath();
    cxt.strokeStyle = 'rgba(0,0,0,0.4)';
    cxt.fillStyle = 'rgba(0,0,0,0.4)';
    this.drawAxis(cxt, 'x');
    this.drawAxis(cxt, 'z');
    this.drawAxis(cxt, 'y');
    cxt.stroke();
    cxt.closePath();
  }

  private calculateAxisPoints() {
    const lenght = 400;
    const height = 30;
    const padding = 5;
    this.axis = {
      zero: HomogenPoint.ApplyTrasformMatrix(new HomogenPoint(0, 0, 0), this.matrix),
      x: {
        arrow: [
          HomogenPoint.ApplyTrasformMatrix(new HomogenPoint(lenght - height, -padding, -padding), this.matrix),
          HomogenPoint.ApplyTrasformMatrix(new HomogenPoint(lenght - height, -padding, padding), this.matrix),
          HomogenPoint.ApplyTrasformMatrix(new HomogenPoint(lenght - height, padding, padding), this.matrix),
          HomogenPoint.ApplyTrasformMatrix(new HomogenPoint(lenght - height, padding, -padding), this.matrix),
        ],
        value: HomogenPoint.ApplyTrasformMatrix(new HomogenPoint(lenght, 0, 0), this.matrix)
      },
      y: {
        arrow: [
          HomogenPoint.ApplyTrasformMatrix(new HomogenPoint(-padding, lenght - height, -padding), this.matrix),
          HomogenPoint.ApplyTrasformMatrix(new HomogenPoint(-padding, lenght - height, padding), this.matrix),
          HomogenPoint.ApplyTrasformMatrix(new HomogenPoint(padding, lenght - height, padding), this.matrix),
          HomogenPoint.ApplyTrasformMatrix(new HomogenPoint(padding, lenght - height, -padding), this.matrix),
        ],
        value: HomogenPoint.ApplyTrasformMatrix(new HomogenPoint(0, lenght, 0), this.matrix)
      },
      z: {
        arrow: [
          HomogenPoint.ApplyTrasformMatrix(new HomogenPoint(-padding, -padding, lenght - height), this.matrix),
          HomogenPoint.ApplyTrasformMatrix(new HomogenPoint(-padding, padding, lenght - height), this.matrix),
          HomogenPoint.ApplyTrasformMatrix(new HomogenPoint(padding, padding, lenght - height), this.matrix),
          HomogenPoint.ApplyTrasformMatrix(new HomogenPoint(padding, -padding, lenght - height), this.matrix),
        ],
        value:
          HomogenPoint.ApplyTrasformMatrix(new HomogenPoint(0, 0, lenght), this.matrix)
      }
    };
  }

  private drawAxis(cxt: CanvasRenderingContext2D, nameAxis: string) {
    cxt.moveTo(this.axis.zero.ToPoint2d.X, this.axis.zero.ToPoint2d.Y);
    cxt.lineTo(this.axis[nameAxis].value.ToPoint2d.X, this.axis[nameAxis].value.ToPoint2d.Y);
    let prew: any = null;
    cxt.font = '32px Georgia';
    cxt.fillText(nameAxis, this.axis[nameAxis].value.ToPoint2d.X + 10, this.axis[nameAxis].value.ToPoint2d.Y - 10);
    for (const point of this.axis[nameAxis].arrow) {
      cxt.lineTo(point.ToPoint2d.X, point.ToPoint2d.Y);
      cxt.moveTo(this.axis[nameAxis].value.ToPoint2d.X, this.axis[nameAxis].value.ToPoint2d.Y);
      if (prew) {
        cxt.lineTo(prew.ToPoint2d.X, prew.ToPoint2d.Y);
        cxt.lineTo(point.ToPoint2d.X, point.ToPoint2d.Y);
        cxt.moveTo(this.axis[nameAxis].value.ToPoint2d.X, this.axis[nameAxis].value.ToPoint2d.Y);
      }
      prew = point;
    }

    cxt.moveTo(prew.ToPoint2d.X, prew.ToPoint2d.Y);
    cxt.lineTo(this.axis[nameAxis].arrow[0].ToPoint2d.X, this.axis[nameAxis].arrow[0].ToPoint2d.Y);
    cxt.lineTo(this.axis[nameAxis].value.ToPoint2d.X, this.axis[nameAxis].value.ToPoint2d.Y);
    cxt.moveTo(this.axis[nameAxis].value.ToPoint2d.X, this.axis[nameAxis].value.ToPoint2d.Y);
    // cxt.fill();
  }
}
