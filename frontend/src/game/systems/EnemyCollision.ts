import { CollisionDamageComponent } from "../components/CollisionDamage";
import { HealthComponent } from "../components/Health";
import { PositionComponent } from "../components/Position";
import { SizeComponent } from "../components/Size";
import { SpriteComponent } from "../components/Sprite";
import { SpriteOffsetComponent } from "../components/SpriteOffset";
import { TagComponent } from "../components/Tag";

import { Entity } from "../core/Entity";
import { System } from "../core/System";
import { EntityManager } from "../managers/EntityManager";

export class EnemyCollisionSystem extends System {
  update(
    player: Entity,
    enemyEntities: Entity[],
    entityManager: EntityManager
  ) {
    const position = player.getComponent("PositionComponent");
    const size = player.getComponent("SizeComponent");
    const health = player.getComponent("HealthComponent");

    if (!position || !size || !health) return;

    enemyEntities.forEach((enemyEntity) => {
      const enemySize = enemyEntity.getComponent("SizeComponent");
      const enemyPos = enemyEntity.getComponent("PositionComponent");
      const damage = enemyEntity.getComponent("CollisionDamageComponent");
      const enemyId = enemyEntity.id;

      if (!enemySize || !enemyPos || !damage) return;

      if (this.isColliding(position, size, enemySize, enemyPos)) {
        this.resolveCollision(health, damage, entityManager, enemyPos, enemyId);
      }
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
    health: HealthComponent,
    collDmg: CollisionDamageComponent,
    entityManager: EntityManager,
    enemyPos: PositionComponent,
    enemyId: number
  ) {
    health.health -= collDmg.damage;

    // SYSTEM DOESNT DELET ENTITIES - ONLY MARKS THEM FOR DELETION
    // ADD ISALIVE TAG TO ENTITY AFTER RENDER IF FLAG FALSE = DELETE IT
    console.log(health.health);
    if (health.health === -500) {
      entityManager
        .createEntity()
        .addComponent(new PositionComponent({ x: enemyPos.x, y: enemyPos.y }))
        .addComponent(new SizeComponent({ w: 32, h: 32 }))
        .addComponent(new SpriteComponent({ src: "/items/gem.png" }))
        .addComponent(new TagComponent({ tag: "drop" }));

      entityManager.removeEntityById(enemyId);
      health.health = 100;
    }
  }
}
