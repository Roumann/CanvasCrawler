import { ColliderComponent, PositionComponent } from "../../components";
import { Entity, System } from "../../core";

export class WallCollisionSystem extends System {
  update(deltaTime: number) {
    const player = this.scene.entityManager.getEntityByTag("player");
    const wallEntities = this.scene.entityManager.getEntitiesWithComponents([
      "TileComponent",
    ]);

    const position = player.getComponent("PositionComponent");
    const size = player.getComponent("ColliderComponent");

    if (!position || !size) return;

    wallEntities.forEach((wallEntity) => {
      const wallSize = wallEntity.getComponent("ColliderComponent");
      const wallPosition = wallEntity.getComponent("PositionComponent");

      if (!wallSize || !wallPosition) return;

      if (this.isColliding(position, size, wallSize, wallPosition)) {
        this.resolveWallCollision(player, wallEntity);
      }
    });
  }

  isColliding(
    position: PositionComponent,
    size: ColliderComponent,
    wallSize: ColliderComponent,
    wallPosition: PositionComponent
  ) {
    return (
      position.x < wallPosition.x + wallSize.w &&
      position.x + size.w > wallPosition.x &&
      position.y < wallPosition.y + wallSize.h &&
      position.y + size.h > wallPosition.y
    );
  }

  resolveWallCollision(entity1: Entity, entity2: Entity) {
    const position1 = entity1.getComponent("PositionComponent");
    const size1 = entity1.getComponent("ColliderComponent");
    const position2 = entity2.getComponent("PositionComponent");
    const size2 = entity2.getComponent("ColliderComponent");

    const isFixed1 = entity1.hasComponent("FixedPositionComponent");
    const isFixed2 = entity2.hasComponent("FixedPositionComponent");

    // Calculate overlap distances
    const deltaX = position1.x + size1.w / 2 - (position2.x + size2.w / 2);
    const deltaY = position1.y + size1.h / 2 - (position2.y + size2.h / 2);

    const overlapX = size1.w / 2 + size2.w / 2 - Math.abs(deltaX);
    const overlapY = size1.h / 2 + size2.h / 2 - Math.abs(deltaY);

    if (overlapX > 0 && overlapY > 0) {
      // Determine the minimum axis of penetration
      if (overlapX < overlapY) {
        // Resolve horizontal collision
        if (deltaX > 0) {
          // Entity1 is to the right of Entity2
          if (!isFixed1) position1.x += overlapX;
          if (!isFixed2) position2.x -= overlapX;
        } else {
          // Entity1 is to the left of Entity2
          if (!isFixed1) position1.x -= overlapX;
          if (!isFixed2) position2.x += overlapX;
        }
      } else {
        // Resolve vertical collision
        if (deltaY > 0) {
          // Entity1 is below Entity2
          if (!isFixed1) position1.y += overlapY;
          if (!isFixed2) position2.y -= overlapY;
        } else {
          // Entity1 is above Entity2
          if (!isFixed1) position1.y -= overlapY;
          if (!isFixed2) position2.y += overlapY;
        }
      }
    }
  }
}
