import { CollisionDamageComponent } from "../components/CollisionDamage";
import { HealthComponent } from "../components/Health";
import { PositionComponent } from "../components/Position";
import { ColliderComponent } from "../components/Collider";
import { SpriteComponent } from "../components/Sprite";
import { TagComponent } from "../components/Tag";
import { System } from "../core/System";

export class EnemyCollisionSystem extends System {
  constructor() {
    super();
  }

  update(deltaTime: number) {
    if (!this.entityManager) return;

    const player = this.entityManager.getEntitiesByTag("player")[0];
    const enemyEntities = this.entityManager.getEntitiesByTag("enemy");

    // TODO FIX THIS
    const position = player.getComponent("PositionComponent");
    const size = player.getComponent("ColliderComponent");
    const health = player.getComponent("HealthComponent");

    if (!position || !size || !health) return;

    enemyEntities.forEach((enemyEntity) => {
      const enemySize = enemyEntity.getComponent("ColliderComponent");
      const enemyPos = enemyEntity.getComponent("PositionComponent");
      const damage = enemyEntity.getComponent("CollisionDamageComponent");
      const enemyId = enemyEntity.id;

      if (!enemySize || !enemyPos || !damage) return;

      if (this.isColliding(position, size, enemySize, enemyPos)) {
        this.resolveCollision(health, damage, enemyPos, enemyId);
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

  resolveCollision(
    health: HealthComponent,
    collDmg: CollisionDamageComponent,
    enemyPos: PositionComponent,
    enemyId: number
  ) {
    health.health -= collDmg.damage;

    // SYSTEM DOESNT DELET ENTITIES - ONLY MARKS THEM FOR DELETION
    // ADD ISALIVE TAG TO ENTITY AFTER RENDER IF FLAG FALSE = DELETE IT
    if (!this.entityManager) return;

    console.log(health.health);
    if (health.health === -500) {
      this.entityManager
        .createEntity()
        .addComponent(new PositionComponent({ x: enemyPos.x, y: enemyPos.y }))
        .addComponent(new ColliderComponent({ w: 32, h: 32 }))
        .addComponent(new SpriteComponent({ src: "/items/gem.png" }))
        .addComponent(new TagComponent({ tag: "drop" }));

      this.entityManager.removeEntityById(enemyId);
      health.health = 100;
    }
  }
}
