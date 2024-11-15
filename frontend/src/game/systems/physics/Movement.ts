import { DirectionComponent } from "../../components/physics/DirectionComponent";
import { AnimationComponent } from "../../components/rendering/Animation";
import { System } from "../../core";
import { clamp } from "../../utils/clamp";
import { Rect } from "../../utils/Rect";

export class MovementSystem extends System {
  pressedKeys: Set<string>;
  keyMap: { [key: string]: string };
  bounds: Rect;

  constructor() {
    super();
    this.pressedKeys = new Set();
    this.keyMap = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down",
    };

    this.bounds = new Rect({ x: 0, y: 0, w: 3200, h: 3200 });

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener("keydown", (e) => {
      if (this.keyMap[e.key] && !this.pressedKeys.has(this.keyMap[e.key])) {
        this.pressedKeys.add(this.keyMap[e.key]);
      }
    });

    window.addEventListener("keyup", (e) => {
      if (this.keyMap[e.key]) {
        this.pressedKeys.delete(this.keyMap[e.key]);
      }
    });
  }

  // TODO change the velocity instead of position
  update(deltaTime: number) {
    if (!this.scene) return;

    const player = this.scene.entityManager.getEntityByTag("player");

    const position = player.getComponent("PositionComponent");
    const velocity = player.getComponent("VelocityComponent");
    const size = player.getComponent("ColliderComponent");
    const direction = player.getComponent(
      "DirectionComponent"
    ) as DirectionComponent;

    const animation = player.getComponent("AnimationComponent");

    if (!position || !velocity || !size || !direction) return;

    if (this.pressedKeys.size === 0) {
      this.setIdleAnimation(direction, animation);
      return;
    }

    // TODO move animtaions from movement system to animation system
    this.pressedKeys.forEach((keyDirection) => {
      switch (keyDirection) {
        case "left":
          direction.direction = "left";

          if (animation) {
            animation.currentAnimation = "walk-left";
          }

          position.x -= velocity.vx * deltaTime;
          break;
        case "right":
          direction.direction = "right";
          if (animation) {
            animation.currentAnimation = "walk-right";
          }

          position.x += velocity.vx * deltaTime;
          break;
        case "up":
          if (animation) {
            animation.currentAnimation =
              direction.direction === "left" ? "walk-up-l" : "walk-up-r";
          }

          position.y -= velocity.vy * deltaTime;

          break;
        case "down":
          if (animation) {
            animation.currentAnimation =
              direction.direction === "left" ? "walk-down-l" : "walk-down-r";
          }

          position.y += velocity.vy * deltaTime;
          break;
      }
    });

    position.x = clamp(position.x, 0, this.bounds.w - size.w);
    position.y = clamp(position.y, 0, this.bounds.h - size.h);
  }

  setIdleAnimation(
    direction: DirectionComponent,
    animation: AnimationComponent
  ) {
    const idleDir = direction.direction === "left" ? "left" : "right";
    animation.currentAnimation = `idle-${idleDir}`;
  }
}
