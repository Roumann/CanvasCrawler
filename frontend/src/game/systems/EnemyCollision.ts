import { CollisionDamageComponent } from "../components/CollisionDamage";
import { HealthComponent } from "../components/Health";
import { PositionComponent } from "../components/Position";
import { SizeComponent } from "../components/Size";

import { Entity } from "../core/Entity";
import { System } from "../core/System";

export class EnemyCollisionSystem extends System {
  update(player: Entity, enemyEntities: Entity[]) {
    const position = player.getComponent("PositionComponent");
    const size = player.getComponent("SizeComponent");
    const health = player.getComponent("HealthComponent");

    if (!position || !size || !health) return;

    enemyEntities.forEach((enemyEntity) => {
      const enemySize = enemyEntity.getComponent("SizeComponent");
      const enemyPos = enemyEntity.getComponent("PositionComponent");
      const damage = enemyEntity.getComponent("CollisionDamageComponent");

      if (!enemySize || !enemyPos || !damage) return;

      if (this.isColliding(position, size, enemySize, enemyPos)) {
        this.resolveCollision(health, damage);
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

  resolveCollision(health: HealthComponent, collDmg: CollisionDamageComponent) {
    console.log("Collision");

    health.health -= collDmg.damage;
  }
}
