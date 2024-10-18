import { PositionComponent } from "../components/Position";
import { VelocityComponent } from "../components/Velocity";
import { WallComponent } from "../components/Wall";
import { Entity } from "../core/Entity";

export class MovementSystem {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;

  constructor() {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

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
      if (position.x > 196) {
        position.x = 196; // canvas width create global variable
      }
      if (position.y > 196) {
        position.y = 196; // canvas height
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
