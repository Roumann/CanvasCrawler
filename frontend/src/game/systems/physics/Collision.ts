import {
  ColliderComponent,
  PositionComponent,
  HealthComponent,
  CollisionDamageComponent,
  SpriteComponent,
  TagComponent,
} from "../../components";
import { System, Entity } from "../../core";

export class CollisionSystem extends System {
  update(deltaTime: number) {
    const collidableEntities =
      this.scene.entityManager.getEntitiesWithComponentsExcl(
        ["ColliderComponent", "PositionComponent"],
        ["MapComponent"]
      );

    for (let i = 0; i < collidableEntities.length; i++) {
      for (let j = i + 1; j < collidableEntities.length; j++) {
        if (collidableEntities[i] === collidableEntities[j]) continue;

        if (this.isColliding(collidableEntities[i], collidableEntities[j])) {
          this.resolveWallCollision(
            collidableEntities[i],
            collidableEntities[j]
          );
        }
      }
    }
  }

  isColliding(entity1: Entity, entity2: Entity) {
    const position1 = entity1.getComponent("PositionComponent");
    const size1 = entity1.getComponent("ColliderComponent");
    const position2 = entity2.getComponent("PositionComponent");
    const size2 = entity2.getComponent("ColliderComponent");

    return (
      position1.x < position2.x + size2.w &&
      position1.x + size1.w > position2.x &&
      position1.y < position2.y + size2.h &&
      position1.y + size1.h > position2.y
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

  resolveEnemyCollision(
    health: HealthComponent,
    collDmg: CollisionDamageComponent,
    enemyPos: PositionComponent,
    enemyId: number
  ) {
    health.health -= collDmg.damage;

    if (health.health <= 0) {
      this.scene.entityManager
        .createEntity()
        .addComponent(new PositionComponent({ x: enemyPos.x, y: enemyPos.y }))
        .addComponent(
          new ColliderComponent({
            w: 32,
            h: 32,
          })
        )
        .addComponent(new SpriteComponent({ src: "/items/gem.png" }))
        .addComponent(new TagComponent({ tag: "drop" }));

      this.scene.entityManager.removeEntityById(enemyId);
      health.health = 100;
    }
  }
}
