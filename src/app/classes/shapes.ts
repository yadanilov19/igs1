import {HomogenPoint} from './homogen-point';

export abstract class ShapeBase {
  vCount: number;
  uCount: number;
  a: number;
  b: number;
  c: number;
  uMin: number;
  uMax: number;
  vMin: number;
  vMax: number;
  uInitMax: number;
  vInitMax: number;
  DEFAULT_PARAMETR_VALUE = 50;
  DEFAULT_COUNT = 20;
  DEFAULT_MAX = 100;
  public name;
  u: number;
  v: number;
  x: number;
  y: number;
  z;


  abstract calc(): void;

  public constructor() {
    this.a = this.b = this.c = this.DEFAULT_PARAMETR_VALUE;
    this.uCount = this.vCount = this.DEFAULT_COUNT;
    this.u = this.v = this.x = this.y = this.z = 0;
    this.uMin = this.vMin = 0;
    this.uInitMax = this.vInitMax = this.uMax = this.vMax = this.DEFAULT_MAX;
  }

  To() {
    return name;
  }

  func(i, j): HomogenPoint {
    this.u = this.uMin + i / (this.uCount - 1) * (this.uMax - this.uMin);
    this.v = this.vMin + j / (this.vCount - 1) * (this.vMax - this.vMin);
    this.calc();
    return new HomogenPoint(this.x, this.y, this.z);
  }
}

export class Paraboloid extends ShapeBase {
  public constructor() {
    super();
    this.uMin = -200;
    this.uInitMax = this.uMax = 200;
    this.vMin = -200;
    this.vInitMax = this.vMax = 200;
    this.a = 15;
    this.b = 15;
    this.name = 'Парабаолоид';
  }

  calc() {
    this.x = this.u;
    this.y = this.v;
    this.z = (this.x * this.x) / (this.a * this.a) - (this.y * this.y) / (this.b * this.b);
  }
}

export class Astroida extends ShapeBase {
  public constructor() {
    super();
    this.uMin = -200;
    this.uInitMax = this.uMax = 200;
    this.vMin = -200;
    this.vInitMax = this.vMax = 200;
    this.a = 15;
    this.b = 15;
    this.name = 'Астроида';
  }

  calc() {
    this.v *= Math.PI / 180;
    this.u *= Math.PI / 180;
    this.x = this.a * Math.pow(Math.sin(this.u), 3);
    this.y = this.b * Math.pow(Math.cos(this.v), 3);
    this.z = this.b * Math.pow(Math.cosh(this.v), 3);
  }
}

export class Tor extends ShapeBase {
  public constructor() {
    super();
    this.uMin = 0;
    this.uInitMax = 360;
    this.uMax = 250;
    this.vMin = 0;
    this.vInitMax = this.vMax = 360;
    this.a = 70;
    this.b = 40;
    this.name = 'Тор';
  }

  calc() {
    this.u *= Math.PI / 180;
    this.v *= Math.PI / 180;
    this.x = (this.b * Math.cos(this.v) + this.a) * Math.cos(this.u);
    this.y = (this.b * Math.cos(this.v) + this.a) * Math.sin(this.u);
    this.z = this.b * Math.sin(this.v);
  }
}

export class Elipsoid extends ShapeBase {
  public constructor() {
    super();
    this.uMin = -90;
    this.uInitMax = 90;
    this.uMax = 90;
    this.vMin = 0;
    this.vInitMax = this.vMax = 360;
    this.name = 'Elipsoid';
  }

  calc() {
    this.u *= Math.PI / 180;
    this.v *= Math.PI / 180;
    this.x = this.a * Math.cos(this.u) * Math.cos(this.v);
    this.y = this.b * Math.cos(this.u) * Math.sin(this.v);
    this.z = -this.b * Math.sin(this.u);
  }
}

export class Cone extends ShapeBase {
  public constructor() {
    super();
    this.uMin = -90;
    this.uInitMax = 0;
    this.uMax = 0;
    this.vMin = -90;
    this.vInitMax = this.vMax = 360;
    this.name = 'Cone';
    this.a = 0.2;
    this.b = 2;
    this.vCount = 10;
    this.uCount = 3;
  }

  calc() {
    // this.u *= Math.PI / 180;
    this.v *= Math.PI / 180;
    this.x = this.a * (this.b - this.u) * Math.cos(this.v);
    this.y = this.a * (this.b - this.u) * Math.sin(this.v);
    this.z = this.u;
  }
}
