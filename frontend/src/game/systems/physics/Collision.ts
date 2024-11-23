import { Entity, System } from "../../../engine/core";
import { isOverlappingAABB } from "../../../engine/math/is-overlapping-aabb";
import {
  ColliderComponent,
  PositionComponent,
  HealthComponent,
  CollisionDamageComponent,
  SpriteComponent,
  TagComponent,
  FixedPositionComponent,
} from "../../components";

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

        let entity1 = collidableEntities[i];
        let entity2 = collidableEntities[j];

        const pos1 =
          entity1.getComponent<PositionComponent>("PositionComponent");
        const coll1 =
          entity1.getComponent<ColliderComponent>("ColliderComponent");
        const pos2 =
          entity2.getComponent<PositionComponent>("PositionComponent");
        const coll2 =
          entity2.getComponent<ColliderComponent>("ColliderComponent");

        const isFixed1 = entity1.hasComponent("FixedPositionComponent");
        const isFixed2 = entity2.hasComponent("FixedPositionComponent");

        if (!pos1 || !coll1 || !pos2 || !coll2) return;

        if (isOverlappingAABB(pos1.pos, coll1, pos2.pos, coll2)) {
          this.resolveWallCollision(
            pos1,
            coll1,
            isFixed1,
            pos2,
            coll2,
            isFixed2
          );
        }
      }
    }
  }

  resolveWallCollision(
    pos1: PositionComponent,
    coll1: ColliderComponent,
    isFixed1: boolean,
    pos2: PositionComponent,
    coll2: ColliderComponent,
    isFixed2: boolean
  ) {
    // Calculate overlap distances
    const deltaX = pos1.pos.x + coll1.w / 2 - (pos2.pos.x + coll2.w / 2);
    const deltaY = pos1.pos.y + coll1.h / 2 - (pos2.pos.y + coll2.h / 2);

    const overlapX = coll1.w / 2 + coll2.w / 2 - Math.abs(deltaX);
    const overlapY = coll1.h / 2 + coll2.h / 2 - Math.abs(deltaY);

    if (overlapX > 0 && overlapY > 0) {
      // Determine the minimum axis of penetration
      if (overlapX < overlapY) {
        // Resolve horizontal collision
        if (deltaX > 0) {
          // Entity1 is to the right of Entity2
          if (!isFixed1) pos1.pos.x += overlapX;
          if (!isFixed2) pos2.pos.x -= overlapX;
        } else {
          // Entity1 is to the left of Entity2
          if (!isFixed1) pos1.pos.x -= overlapX;
          if (!isFixed2) pos2.pos.x += overlapX;
        }
      } else {
        // Resolve vertical collision
        if (deltaY > 0) {
          // Entity1 is below Entity2
          if (!isFixed1) pos1.pos.y += overlapY;
          if (!isFixed2) pos2.pos.y -= overlapY;
        } else {
          // Entity1 is above Entity2
          if (!isFixed1) pos1.pos.y -= overlapY;
          if (!isFixed2) pos2.pos.y += overlapY;
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
        .addComponent(
          new PositionComponent({ x: enemyPos.pos.x, y: enemyPos.pos.y })
        )
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
