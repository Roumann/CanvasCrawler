import { PositionComponent } from "../../game/components";
import { clamp } from "../math/clamp";
import { Vector2 } from "../math/vector2";
import { EntityManager } from "./managers/entity-manager";

export type TCamera = {
  camera: { bounds: { min: number; max: number } };
  context: CanvasRenderingContext2D | null;
};

export class Camera {
  pos: Vector2;
  cameraBounds: { min: number; max: number };
  context: CanvasRenderingContext2D | null;

  constructor({ camera, context }: TCamera) {
    this.pos = new Vector2(0, 0);
    this.context = context;
    this.cameraBounds = camera.bounds;
  }

  update(entityManager: EntityManager) {
    const follow = entityManager.getEntityWithComponent([
      "CameraFollowComponent",
    ]);

    if (!follow || !this.context) return;
    const position =
      follow.getComponent<PositionComponent>("PositionComponent");
    if (!position) return;

    this.pos.x = clamp(
      position.pos.x - this.context.canvas.width / 2,
      this.cameraBounds.min,
      this.cameraBounds.max - this.context.canvas.width
    );

    this.pos.y = clamp(
      position.pos.y - this.context.canvas.height / 2,
      this.cameraBounds.min,
      this.cameraBounds.max - this.context.canvas.height
    );
  }

  get position() {
    return { x: this.pos.x, y: this.pos.y };
  }
}
