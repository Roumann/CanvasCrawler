import { Entity } from "../core/Entity";
import { System } from "../core/System";
import { clamp } from "../utils/clamp";
import { Rect } from "../utils/Rect";

export class MovementSystem extends System {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  bounds: Rect;
  context: CanvasRenderingContext2D | null;

  constructor(ctx: CanvasRenderingContext2D | null) {
    super();
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

    this.context = ctx ?? null;
    this.bounds = new Rect({ x: 0, y: 0, w: 3200, h: 3200 });

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
        case "ArrowUp":
          this.up = true;
          break;
        case "ArrowDown":
          this.down = true;
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
        case "ArrowUp":
          this.up = false;
          break;
        case "ArrowDown":
          this.down = false;
          break;
      }
    });
  }

  // TODO change the velocity instead of position
  update(deltaTime: number) {
    if (!this.entityManager) return;

    const entities = this.entityManager.getEntitiesWithComponentsExcl(
      ["PositionComponent", "VelocityComponent", "SpriteOffsetComponent"],
      ["TileComponent"]
    );

    entities.forEach((entity) => {
      const position = entity.getComponent("PositionComponent");
      const velocity = entity.getComponent("VelocityComponent");
      const size = entity.getComponent("ColliderComponent");

      if (!position || !velocity || !size || !this.context) return;

      if (this.left) {
        position.x -= velocity.vx * deltaTime;
      }
      if (this.right) {
        position.x += velocity.vx * deltaTime;
      }
      if (this.up) {
        position.y -= velocity.vy * deltaTime;
      }
      if (this.down) {
        position.y += velocity.vy * deltaTime;
      }

      position.x = clamp(position.x, 0, this.bounds.w - size.w);
      position.y = clamp(position.y, 0, this.bounds.h - size.h);
    });
  }
}
