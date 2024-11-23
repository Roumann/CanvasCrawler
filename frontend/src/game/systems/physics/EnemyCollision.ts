import { System } from "../../../engine/core";
import { isOverlappingAABB } from "../../../engine/math/is-overlapping-aabb";
import {
  ColliderComponent,
  CollisionDamageComponent,
  HealthComponent,
  PositionComponent,
  SpriteComponent,
  TagComponent,
} from "../../components";

export class EnemyCollisionSystem extends System {
  constructor() {
    super();
  }

  update(deltaTime: number) {
    const player = this.scene.entityManager.getEntityByTag("player");
    const enemyEntities = this.scene.entityManager.getEntitiesByTag("enemy");

    // TODO FIX THIS
    const position =
      player.getComponent<PositionComponent>("PositionComponent");
    const size = player.getComponent<ColliderComponent>("ColliderComponent");

    const health = player.getComponent<HealthComponent>("HealthComponent");

    if (!position || !size || !health) return;

    enemyEntities.forEach((enemyEntity) => {
      const enemySize =
        enemyEntity.getComponent<ColliderComponent>("ColliderComponent");
      const enemyPos =
        enemyEntity.getComponent<PositionComponent>("PositionComponent");
      const damage = enemyEntity.getComponent<CollisionDamageComponent>(
        "CollisionDamageComponent"
      );
      const enemyId = enemyEntity.id;

      if (!enemySize || !enemyPos || !damage) return;

      if (isOverlappingAABB(position.pos, size, enemyPos.pos, enemySize)) {
        this.resolveCollision(health, damage, enemyPos, enemyId);
      }
    });
  }

  resolveCollision(
    health: HealthComponent,
    collDmg: CollisionDamageComponent,
    enemyPos: PositionComponent,
    enemyId: number
  ) {
    health.health -= collDmg.damage;

    // SYSTEM DOESNT DELET ENTITIES - ONLY MARKS THEM FOR DELETION
    // ADD ISALIVE TAG TO ENTITY AFTER RENDER IF FLAG FALSE = DELETE IT
    if (health.health === -500) {
      this.scene.entityManager
        .createEntity()
        .addComponent(
          new PositionComponent({ x: enemyPos.pos.x, y: enemyPos.pos.y })
        )
        .addComponent(new ColliderComponent({ w: 32, h: 32 }))
        .addComponent(new SpriteComponent({ src: "/items/gem.png" }))
        .addComponent(new TagComponent({ tag: "drop" }));

      this.scene.entityManager.removeEntityById(enemyId);
      health.health = 100;
    }
  }
}
