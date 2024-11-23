import { Vector2 } from "../../engine/math/vector2";

export type TVelocityComponent = {
  vx: number;
  vy: number;
  friction: number;
};

export class VelocityComponent {
  vel: Vector2;
  friction: number;

  constructor(vel: TVelocityComponent) {
    this.vel = new Vector2(vel.vx, vel.vy);
    this.friction = vel.friction;
  }
}
