import {HomogenPoint} from './homogen-point';

export class Polygon {
  a: HomogenPoint;
  b: HomogenPoint;
  c: HomogenPoint;

  constructor(_a: HomogenPoint, _b: HomogenPoint, _c: HomogenPoint) {
    this.a = _a;
    this.b = _b;
    this.c = _c;
  }

  getZ() {
    return (this.a.Z + this.b.Z + this.c.Z) / 3;
  }

  getCos() {
    const ax = this.b.X - this.a.X;
    const ay = this.b.Y - this.a.Y;
    const az = this.b.Z - this.a.Z;
    const bx = this.c.X - this.a.X;
    const by = this.c.Y - this.a.Y;
    const bz = this.c.Z - this.a.Z;
    const x = ay * bz - az * by;
    const y = az * bx - ax * bz;
    const z = ax * by - ay * bx;
    const size = Math.sqrt(x * x + y * y + z * z);
    return z / size;
  }
}
