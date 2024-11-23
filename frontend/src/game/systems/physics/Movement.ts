import { PlayerAnimations } from "../../animations/player";
import {
  ColliderComponent,
  PositionComponent,
  VelocityComponent,
} from "../../components";
import { AccelerationComponent } from "../../components/Acceleration";
import { DirectionComponent } from "../../components/DirectionComponent";
import { AnimationComponent } from "../../components/Animation";

import { clamp } from "../../../engine/math/clamp";

import { System } from "../../../engine/core";
import { Rect } from "../../../engine/math/rect";

export class MovementSystem extends System {
  bounds: Rect;

  constructor() {
    super();
    this.bounds = new Rect({ x: 0, y: 0, w: 3200, h: 3200 });
  }

  update() {
    if (!this.scene) return;
    const keys = this.scene.inputManager;

    // This way i could have a system like enemyAI that will return left = true; and then movement system will move the enemy

    // TODO add dash - when pressing space add DashComponent to player - Dash System will pick it up reduce dash time add velocity to player and after
    // dash expires remove component from player - when dash component is on player return early from movement to prevent moving while dashing

    const entities = this.scene.entityManager.getEntitiesWithComponents([
      "KeyboardControls",
    ]);

    for (const entity of entities) {
      const position =
        entity.getComponent<PositionComponent>("PositionComponent");
      const velocity =
        entity.getComponent<VelocityComponent>("VelocityComponent");
      const acc = entity.getComponent<AccelerationComponent>(
        "AccelerationComponent"
      );
      const collider =
        entity.getComponent<ColliderComponent>("ColliderComponent");
      const direction =
        entity.getComponent<DirectionComponent>("DirectionComponent");
      const animation =
        entity.getComponent<AnimationComponent<PlayerAnimations>>(
          "AnimationComponent"
        );

      if (!position || !velocity || !acc || !collider || !direction) return;

      if (!keys.isPressed()) {
        this.setIdleAnimation(direction, animation);
        continue;
      }

      // TODO move animtaions from movement system to animation system
      if (keys.isKeyPressed("ArrowLeft")) {
        direction.direction = "left";
        if (animation) {
          animation.currentAnimation = "walk-left";
        }
        acc.acc.x = -acc.base;
      }
      if (keys.isKeyPressed("ArrowRight")) {
        direction.direction = "right";
        if (animation) {
          animation.currentAnimation = "walk-right";
        }
        acc.acc.x = acc.base;
      }
      if (keys.isKeyPressed("ArrowUp")) {
        if (animation) {
          animation.currentAnimation =
            direction.direction === "left" ? "walk-up-l" : "walk-up-r";
        }
        acc.acc.y = -acc.base;
      }
      if (keys.isKeyPressed("ArrowDown")) {
        if (animation) {
          animation.currentAnimation =
            direction.direction === "left" ? "walk-down-l" : "walk-down-r";
        }
        acc.acc.y = acc.base;
      }
      if (!keys.isKeyPressed("ArrowLeft") && !keys.isKeyPressed("ArrowRight")) {
        acc.acc.x = 0;
      }
      if (!keys.isKeyPressed("ArrowUp") && !keys.isKeyPressed("ArrowDown")) {
        acc.acc.y = 0;
      }

      // normalize acceleration vector, this keeps the diagonal movement and axis movement the same speed
      // then scale it by the base acceleration
      acc.acc = acc.acc.unit().mult(acc.base);

      // apply acceleration in the direction of the target
      velocity.vel = velocity.vel.add(acc.acc);
      // apply friction to slow down the ball over time, stops the object from moving forever
      velocity.vel = velocity.vel.mult(1 - velocity.friction);

      // update the position by adding the velocity vector, velocity determines how far the object move this frame
      position.pos = position.pos.add(velocity.vel);

      // Clamp the position to the bounds of the scene
      position.pos.x = clamp(position.pos.x, 0, this.bounds.w - collider.w);
      position.pos.y = clamp(position.pos.y, 0, this.bounds.h - collider.h);
    }
  }

  setIdleAnimation(
    direction: DirectionComponent,
    animation: AnimationComponent<PlayerAnimations> | undefined
  ) {
    if (!animation) return;
    const idleDir = direction.direction === "left" ? "left" : "right";
    animation.currentAnimation = `idle-${idleDir}`;
  }
}
