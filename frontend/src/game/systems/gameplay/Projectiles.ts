import { ColliderComponent, PositionComponent } from "../../components";
import { Entity, System } from "../../core";

export class ProjectileSystem extends System {
  constructor() {
    super();
  }

  update(deltaTime: number) {
    const projectiles = this.scene.entityManager.getEntitiesByTag("projectile");
    const enemies = this.scene.entityManager.getEntitiesByTag("enemy");

    projectiles.forEach((projectile) => {
      const position = projectile.getComponent("PositionComponent");
      const collider = projectile.getComponent("ColliderComponent");
      const velocity = projectile.getComponent("VelocityComponent");
      const lifetime = projectile.getComponent("LifeTimeComponent");
      const direction = projectile.getComponent("DirectionComponent");

      if (!position || !velocity || !lifetime || !direction || !collider)
        return;

      switch (direction.direction) {
        case "left":
          position.x -= velocity.vx * deltaTime;
          break;
        case "right":
          position.x += velocity.vx * deltaTime;
          break;
        case "up":
          position.y -= velocity.vy * deltaTime;
          break;
        case "down":
          position.y += velocity.vy * deltaTime;
          break;
      }

      for (const enemy of enemies) {
        const enCol = enemy.getComponent("ColliderComponent");
        const enPos = enemy.getComponent("PositionComponent");

        if (this.isColliding(position, collider, enCol, enPos)) {
          this.resolveCollision(projectile, enemy);
        }
      }

      // Reduce lifetime and check if expired
      lifetime.time -= deltaTime;
      if (lifetime.time <= 0) {
        this.scene?.entityManager.removeEntityById(projectile.id);
      }
    });
  }

  isColliding(
    position: PositionComponent,
    collider: ColliderComponent,
    enCol: ColliderComponent,
    enPos: PositionComponent
  ) {
    return (
      position.x < enPos.x + enCol.w &&
      position.x + collider.w > enPos.x &&
      position.y < enPos.y + enCol.h &&
      position.y + collider.h > enPos.y
    );
  }

  resolveCollision(projectile: Entity, enemy: Entity) {
    const damage = projectile.getComponent("DamageComponent");
    const health = enemy.getComponent("HealthComponent");

    health.health -= damage.value;

    if (health.health <= health.maxHealth) {
      this.scene.entityManager.removeEntityById(enemy.id);
    }
  }
}
