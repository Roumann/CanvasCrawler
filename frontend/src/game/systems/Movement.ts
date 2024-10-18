import { Entity } from "../core/Entity";
import { Rect } from "../utils/Rect";

export class MovementSystem {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  bounds: Rect;

  constructor(canvas: HTMLCanvasElement) {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

    this.bounds = new Rect(0, 0, canvas.width, canvas.height);

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
  update(entities: Entity[], deltaTime: number) {
    entities.forEach((entity) => {
      const position = entity.getComponent("PositionComponent");
      const velocity = entity.getComponent("VelocityComponent");

      if (!position || !velocity) return;

      if (position.x < 0) {
        position.x = 0;
      }
      if (position.y < 0) {
        position.y = 0;
      }
      if (position.x > this.bounds.w - 32) {
        position.x = this.bounds.w - 32; // canvas width create global variable
      }
      if (position.y > this.bounds.h - 32) {
        position.y = this.bounds.h - 32; // canvas height
      }

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
    });
  }
}
