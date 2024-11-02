import {
  ColliderComponent,
  PositionComponent,
  SpriteComponent,
  TagComponent,
  VelocityComponent,
} from "../../components";
import { DamageComponent } from "../../components/gameplay/DamageComponent";
import { LifeTimeComponent } from "../../components/gameplay/LifeTimeComponent";
import { DirectionComponent } from "../../components/physics/DirectionComponent";
import { Camera, System } from "../../core";
import { clamp } from "../../utils/clamp";
import { Rect } from "../../utils/Rect";

export class MovementSystem extends System {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  bounds: Rect;
  context: CanvasRenderingContext2D | null;
  camera: Camera;

  constructor(ctx: CanvasRenderingContext2D | null, camera: Camera) {
    super();
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

    this.context = ctx ?? null;
    this.bounds = new Rect({ x: 0, y: 0, w: 3200, h: 3200 });

    this.camera = camera;

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

    window.addEventListener("mousedown", (e) => {
      const rect = this.context?.canvas.getBoundingClientRect();
      if (!rect) return;

      const mousePosX = e.pageX - rect.left;
      const mousePosY = e.pageY - rect.top;

      switch (e.button) {
        case 0:
          console.log("Add");
          this.entityManager
            ?.createEntity()
            .addComponent(
              new PositionComponent({
                x: mousePosX + this.camera.x,
                y: mousePosY + this.camera.y,
              })
            )
            .addComponent(new ColliderComponent({ w: 32, h: 32 }))
            .addComponent(new SpriteComponent({ src: "/items/gem.png" }))
            .addComponent(new VelocityComponent({ vx: 60, vy: 60 }))
            .addComponent(new LifeTimeComponent({ time: 2 }))
            .addComponent(new DamageComponent({ value: 10 }))
            .addComponent(new DirectionComponent({}))
            .addComponent(new TagComponent({ tag: "projectile" }));

          break;
        case 1:
          console.log("Remove");
          this.entityManager?.removeEntityByTag("projectile");

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

    const player = this.entityManager.getEntityByTag("player");

    const position = player.getComponent("PositionComponent");
    const velocity = player.getComponent("VelocityComponent");
    const size = player.getComponent("ColliderComponent");

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
  }
}
