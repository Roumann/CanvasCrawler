import { Vector2 } from "../../engine/math/vector2";

export type TAccelerationComponent = {
  ax: number;
  ay: number;
  base: number;
};

export class AccelerationComponent {
  acc: Vector2;
  base: number;

  constructor(acc: TAccelerationComponent) {
    this.acc = new Vector2(acc.ax, acc.ay);
    this.base = acc.base ?? 1;
  }
}
