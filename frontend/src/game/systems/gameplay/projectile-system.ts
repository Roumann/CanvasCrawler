import { ColliderComponent, PositionComponent } from "../../components";
import { AnimationComponent } from "../../components/rendering/Animation";
import { Entity, System } from "../../core";

export class ProjectileSystem extends System {
  constructor() {
    super();
  }

  // THIS SYSTEM SHOULD TAKE PROJECTILES SPAWNED BY ATTACK SYSTEM AND MOVE THEM, CHECK THEIR LIFETIME, CHECK IF THEY COLLIDE

  update(deltaTime: number) {
    const projectiles = this.scene.entityManager.getEntitiesWithComponents([
      "DamageComponent",
      "LifeTimeComponent",
    ]);
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
    const hitTracking = projectile.getComponent("HitTrackingComponent");

    const health = enemy.getComponent("HealthComponent");
    const animation = enemy.getComponent(
      "AnimationComponent"
    ) as AnimationComponent;

    if (hitTracking) {
      if (hitTracking.hasHit(enemy.id)) return;
      hitTracking.addHit(enemy.id);
      console.log(hitTracking.hitEnemies);
    }

    health.health -= damage.value;
    animation.currentAnimation = "damage";

    if (projectile.getComponent("TagComponent").tag === "projectile") {
      this.scene.entityManager.removeEntityById(projectile.id);
    }

    if (health.health <= 0) {
      if (hitTracking) {
        hitTracking.remove(enemy.id);
      }

      this.scene.entityManager.removeEntityById(enemy.id);
    }
  }
}