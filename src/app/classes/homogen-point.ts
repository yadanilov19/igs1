import {TransformMatrix} from './transform-matrix';

export class HomogenPoint {
  constructor(x, y, z, c = 1) {
    this._coordinates = {
      X: x,
      Y: y,
      Z: z,
      C: c
    };
  }

  private _coordinates: {
    X: number,
    Y: number,
    Z: number,
    C: number
  };

  asArray() {
    return [
      this._coordinates.X,
      this._coordinates.Y,
      this._coordinates.Z,
      this._coordinates.C,
    ];
  }

  setPoint(point: HomogenPoint) {
    this._coordinates = point._coordinates;
  }

  public get ToPoint2d() {
    return {X: this.X / this.C, Y: this.Y / this.C};
  }

  get X(): number {
    return this._coordinates.X;
  }

  set X(value: number) {
    this._coordinates.X = value;
  }

  get Y(): number {
    return this._coordinates.Y;
  }

  set Y(value: number) {
    this._coordinates.Y = value;
  }

  get Z(): number {
    return this._coordinates.Z;
  }

  set Z(value: number) {
    this._coordinates.Z = value;
  }

  get C(): number {
    return this._coordinates.C;
  }

  set C(value: number) {
    this._coordinates.C = value;
  }

  static ApplyTrasformMatrix(point: HomogenPoint, matrix: TransformMatrix): HomogenPoint {
    const pointArr = point.asArray();
    const resArr = pointArr.map(x => 0);
    for (let i = 0; i < matrix.data.length; i++) {
      for (let j = 0; j < matrix.data[i].length; j++) {
        resArr[i] += pointArr[j] * matrix.data[j][i];
      }
    }
    point.setPoint(new HomogenPoint(resArr[0], resArr[1], resArr[2], resArr[3]));
    return point;
  }
}
