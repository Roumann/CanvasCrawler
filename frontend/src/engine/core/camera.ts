import { PositionComponent } from "../../game/components";
import { clamp } from "../math/clamp";
import { Rect } from "../math/rect";
import { Vector2 } from "../math/vector2";
import { EntityManager } from "./managers/entity-manager";

export type TCamera = {
  bounds: Rect;
  context: CanvasRenderingContext2D;
};

export class Camera {
  bounds: Rect;
  context: CanvasRenderingContext2D;
  pos: Vector2;

  constructor({ bounds, context }: TCamera) {
    this.pos = new Vector2(0, 0);
    this.context = context;
    this.bounds = bounds;
  }

  update(entityManager: EntityManager) {
    const follow = entityManager.getEntityWithComponent([
      "CameraFollowComponent",
    ]);
    if (!follow) return;

    const position =
      follow.getComponent<PositionComponent>("PositionComponent");
    if (!position) return;

    this.pos.x = clamp(
      position.pos.x - this.context.canvas.width / 2,
      this.bounds.x,
      this.bounds.x + this.bounds.w - this.context.canvas.width
    );

    this.pos.y = clamp(
      position.pos.y - this.context.canvas.height / 2,
      this.bounds.y,
      this.bounds.y + this.bounds.h - this.context.canvas.height
    );
  }

  get position() {
    return { x: this.pos.x, y: this.pos.y };
  }
}
