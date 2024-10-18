import { PositionComponent } from "../components/Position";
import { SizeComponent } from "../components/Size";

import { Entity } from "../core/Entity";

export class CollisionSystem {
  update(entities: Entity[], wallEntities: Entity[]) {
    entities.forEach((entity) => {
      const position = entity.getComponent("PositionComponent");
      const size = entity.getComponent("SizeComponent");

      if (!position || !size) return;

      wallEntities.forEach((wallEntity) => {
        const wallSize = wallEntity.getComponent("SizeComponent");
        const wallPosition = wallEntity.getComponent("PositionComponent");

        if (!wallSize || !wallPosition) return;

        if (this.isColliding(position, size, wallSize, wallPosition)) {
          this.resolveCollision(position, size, wallSize, wallPosition);
        }
      });
    });
  }

  isColliding(
    position: PositionComponent,
    size: SizeComponent,
    wallSize: SizeComponent,
    wallPosition: PositionComponent
  ) {
    return (
      position.x < wallPosition.x + wallSize.w &&
      position.x + size.w > wallPosition.x &&
      position.y < wallPosition.y + wallSize.h &&
      position.y + size.h > wallPosition.y
    );
  }

  resolveCollision(
    position: PositionComponent,
    size: SizeComponent,
    wallSize: SizeComponent,
    wallPosition: PositionComponent
  ) {
    //Calculate the overlap from center of the object to the center of the wall
    const overlapX =
      position.x + size.w / 2 - (wallPosition.x + wallSize.w / 2);
    const overlapY =
      position.y + size.h / 2 - (wallPosition.y + wallSize.h / 2);

    // Resolve the collision based on the movement direction
    if (Math.abs(overlapX) > Math.abs(overlapY)) {
      // Horizontal collision
      if (overlapX > 0) {
        // Player is to the right of the wall
        position.x = wallPosition.x + wallSize.w; // Move player to the right of the wall
      } else {
        // Player is to the left of the wall
        position.x = wallPosition.x - size.w; // Move player to the left of the wall
      }
    } else {
      // Vertical collision
      if (overlapY > 0) {
        // Player is below the wall
        position.y = wallPosition.y + wallSize.h; // Move player below the wall
      } else {
        // Player is above the wall
        position.y = wallPosition.y - size.h; // Move player above the wall
      }
    }
  }
}
