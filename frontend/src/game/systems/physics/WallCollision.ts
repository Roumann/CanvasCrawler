import { Entity, System } from "../../../engine/core";
import { isOverlappingAABB } from "../../../engine/math/is-overlapping-aabb";
import {
  ColliderComponent,
  PositionComponent,
  VelocityComponent,
} from "../../components";

export class WallCollisionSystem extends System {
  update(deltaTime: number) {
    // TODO this only checks player extend to check all colliders
    const player = this.scene.entityManager.getEntityByTag("player");
    const wallEntities = this.scene.entityManager.getEntitiesWithComponents([
      "TileComponent",
    ]);

    const position =
      player.getComponent<PositionComponent>("PositionComponent");
    const collider =
      player.getComponent<ColliderComponent>("ColliderComponent");

    if (!position || !collider) return;

    wallEntities.forEach((wallEntity) => {
      const wallSize =
        wallEntity.getComponent<ColliderComponent>("ColliderComponent");
      const wallPosition =
        wallEntity.getComponent<PositionComponent>("PositionComponent");

      if (!wallSize || !wallPosition) return;

      if (
        isOverlappingAABB(position.pos, collider, wallPosition.pos, wallSize)
      ) {
        this.resolveWallCollision(player, wallEntity);
      }
    });
  }

  resolveWallCollision(entity1: Entity, entity2: Entity) {
    const position1 =
      entity1.getComponent<PositionComponent>("PositionComponent");
    const size1 = entity1.getComponent<ColliderComponent>("ColliderComponent");
    const position2 =
      entity2.getComponent<PositionComponent>("PositionComponent");
    const size2 = entity2.getComponent<ColliderComponent>("ColliderComponent");
    const velocity1 =
      entity1.getComponent<VelocityComponent>("VelocityComponent");
    if (!position1 || !size1 || !position2 || !size2 || !velocity1) return;

    const isFixed1 = entity1.hasComponent("FixedPositionComponent");
    // Calculate overlap distances
    const deltaX =
      position1.pos.x + size1.w / 2 - (position2.pos.x + size2.w / 2);
    const deltaY =
      position1.pos.y + size1.h / 2 - (position2.pos.y + size2.h / 2);

    const overlapX = size1.w / 2 + size2.w / 2 - Math.abs(deltaX);
    const overlapY = size1.h / 2 + size2.h / 2 - Math.abs(deltaY);

    if (overlapX > 0 && overlapY > 0) {
      // Determine the minimum axis of penetration
      if (overlapX < overlapY) {
        // Resolve horizontal collision
        if (deltaX > 0) {
          if (!isFixed1) position1.pos.x += overlapX;
          if (!isFixed1 && velocity1)
            velocity1.vel.x = Math.max(velocity1.vel.x, 0);
        } else {
          if (!isFixed1) position1.pos.x -= overlapX;
          if (!isFixed1 && velocity1)
            velocity1.vel.x = Math.min(velocity1.vel.x, 0);
        }
      } else {
        // Resolve vertical collision
        if (deltaY > 0) {
          if (!isFixed1) position1.pos.y += overlapY;
          if (!isFixed1 && velocity1)
            velocity1.vel.y = Math.max(velocity1.vel.y, 0);
        } else {
          if (!isFixed1) position1.pos.y -= overlapY;
          if (!isFixed1 && velocity1)
            velocity1.vel.y = Math.min(velocity1.vel.y, 0);
        }
      }
    }
  }
}
