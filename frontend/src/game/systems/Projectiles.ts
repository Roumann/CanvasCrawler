import { System } from "../core/System";

export class ProjectileSystem extends System {
  constructor() {
    super();
  }

  update(deltaTime: number) {
    if (!this.entityManager) return;
    const projectiles = this.entityManager.getEntitiesWithComponents([
      "ProjectileComponent",
      "PositionComponent",
      "VelocityComponent",
      //   "LifetimeComponent",
    ]);

    projectiles.forEach((projectile) => {
      const position = projectile.getComponent("PositionComponent");
      const velocity = projectile.getComponent("VelocityComponent");
      // const lifetime = projectile.getComponent("LifetimeComponent");

      // Move projectile
      position.x += velocity.dx * deltaTime;
      position.y += velocity.dy * deltaTime;

      // Reduce lifetime and check if expired
      //   lifetime.time -= deltaTime;
      //   if (lifetime.time <= 0) {
      //     this.entityManager.removeEntity(projectile);
      //   }
    });
  }
}
