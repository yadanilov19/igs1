import {HomogenPoint} from './homogen-point';

export class TransformMatrix {
  constructor(matrix: number[][]) {
    this.data = matrix;
  }

  data: number[][];

  static Null(): TransformMatrix {
    return new TransformMatrix([0, 0, 0, 0].map(x => [0, 0, 0, 0]));
  }

  static Identity(): TransformMatrix {
    const res = TransformMatrix.Null();
    for (let i = 0; i < res.data.length; i++) {
      res.data[i][i] = 1;
    }

    return res;
  }

  static RotateOX(angle: number): TransformMatrix {
    const result = TransformMatrix.Null();
    const cos = Math.cos(angle * Math.PI / 180);
    const sin = Math.sin(angle * Math.PI / 180);
    result.data[0][0] = 1;
    result.data[1][1] = cos;
    result.data[1][2] = sin;
    result.data[2][1] = -sin;
    result.data[2][2] = cos;
    result.data[3][3] = 1;
    return result;
  }

  static RotateOZ(angle: number): TransformMatrix {
    const result = TransformMatrix.Null();
    const cos = Math.cos(angle * Math.PI / 180);
    const sin = Math.sin(angle * Math.PI / 180);
    result.data[0][0] = cos;
    result.data[0][1] = sin;
    result.data[1][0] = -sin;
    result.data[1][1] = cos;
    result.data[2][2] = 1;
    result.data[3][3] = 1;
    return result;
  }

  static RotateOY(angle: number): TransformMatrix {
    const result = TransformMatrix.Null();
    const cos = Math.cos(angle * Math.PI / 180);
    const sin = Math.sin(angle * Math.PI / 180);
    result.data[0][0] = cos;
    result.data[0][2] = -sin;
    result.data[1][1] = 1;
    result.data[2][0] = sin;
    result.data[2][2] = cos;
    result.data[3][3] = 1;
    return result;
  }

  static CentralProjectionXOY(c: number): TransformMatrix {
    const result = TransformMatrix.Identity();
    result.data[2][3] = -1.0 / c;
    return result;
  }

  static CentralProjectionXOZ(c: number): TransformMatrix {
    const result = TransformMatrix.Identity();
    result.data[1][3] = -1.0 / c;
    return result;
  }

  static CentralProjectionYOZ(c: number): TransformMatrix {
    const result = TransformMatrix.Identity();
    result.data[0][3] = -1.0 / c;
    return result;
  }

  static OrthogonalProjectionXOY(): TransformMatrix {
    return TransformMatrix.Deformation(1, 1, 0);
  }

  static OrthogonalProjectionXOZ(): TransformMatrix {
    return TransformMatrix.Deformation(1, 0, 1);
  }

  static OrthogonalProjectionYOZ(): TransformMatrix {
    return TransformMatrix.Deformation(0, 1, 1);
  }

  static Deformation(a, b, c): TransformMatrix {
    const result = TransformMatrix.Identity();
    result.data[0][0] = a;
    result.data[1][1] = b;
    result.data[2][2] = c;
    return result;
  }

  static ReflectionX(): TransformMatrix {
    return TransformMatrix.Deformation(-1, 1, 1);
  }

  static ReflectionY(): TransformMatrix {
    return TransformMatrix.Deformation(1, -1, 1);
  }

  static ReflectionZ(): TransformMatrix {
    return TransformMatrix.Deformation(1, 1, -1);
  }

  static Move(point: HomogenPoint): TransformMatrix {
    const result = TransformMatrix.Identity();
    result.data[3][0] = point.X;
    result.data[3][1] = point.Y;
    result.data[3][2] = point.Z;
    return result;
  }

  static Multipy(m1: TransformMatrix, m2: TransformMatrix): TransformMatrix {
    const m3 = TransformMatrix.Null();
    for (let i = 0; i < 4; ++i) {
      for (let j = 0; j < 4; ++j) {
        for (let k = 0; k < 4; ++k) {
          m3.set(i, j, m3.get(i, j) + m1.get(i, k) * m2.get(k, j));
        }
      }
    }
    return m3;
  }


  get(i: number, j: number): number {
    return this.data[i][j];
  }

  getRow(i: number): number[] {
    return this.data[i];
  }

  set(i: number, j: number, value: number) {
    this.data[i][j] = value;
  }

  setRow(i: number, value: number[]) {
    this.data[i] = value;
  }
}
