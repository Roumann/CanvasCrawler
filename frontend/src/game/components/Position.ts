import { Vector2 } from "../../engine/math/vector2";

export type TPositionComponent = {
  x: number;
  y: number;
};

export class PositionComponent {
  pos: Vector2;

  constructor(pos: TPositionComponent) {
    this.pos = new Vector2(pos.x, pos.y);
  }
}
