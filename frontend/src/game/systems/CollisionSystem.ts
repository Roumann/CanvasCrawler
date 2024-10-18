import { PositionComponent } from "../components/Position";
import { SizeComponent } from "../components/Size";
import { WallComponent } from "../components/Wall";
import { Entity } from "../core/Entity";

export class CollisionSystem {
  update(entities: Entity[], wallEntities: Entity[]) {
    entities.forEach((entity) => {
      const position = entity.getComponent("PositionComponent");
      const size = entity.getComponent("SizeComponent");

      if (!position || !size) return;

      wallEntities.forEach((wallEntity) => {
        const wall = wallEntity.getComponent("WallComponent");
        if (!wall) return;

        if (this.isColliding(position, size, wall)) {
          this.resolveCollision(position, size, wall);
        }
      });
    });
  }

  isColliding(
    position: PositionComponent,
    size: SizeComponent,
    wall: WallComponent
  ) {
    return (
      position.x < wall.x + wall.w &&
      position.x + size.w > wall.x &&
      position.y < wall.y + wall.h &&
      position.y + size.h > wall.y
    );
  }

  resolveCollision(
    position: PositionComponent,
    size: SizeComponent,
    wall: WallComponent
  ) {
    //Calculate the overlap from center of the object to the center of the wall
    const overlapX = position.x + size.w / 2 - (wall.x + wall.w / 2);
    const overlapY = position.y + size.h / 2 - (wall.y + wall.h / 2);

    // Resolve the collision based on the movement direction
    if (Math.abs(overlapX) > Math.abs(overlapY)) {
      // Horizontal collision
      if (overlapX > 0) {
        // Player is to the right of the wall
        position.x = wall.x + wall.w; // Move player to the right of the wall
      } else {
        // Player is to the left of the wall
        position.x = wall.x - size.w; // Move player to the left of the wall
      }
    } else {
      // Vertical collision
      if (overlapY > 0) {
        // Player is below the wall
        position.y = wall.y + wall.h; // Move player below the wall
      } else {
        // Player is above the wall
        position.y = wall.y - size.h; // Move player above the wall
      }
    }
  }
}
