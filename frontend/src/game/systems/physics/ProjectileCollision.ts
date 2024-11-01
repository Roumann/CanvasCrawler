import { System } from "../../core";

export class ProjectileCollisionSystem extends System {
  constructor() {
    super();
  }

  update(deltaTime: number) {
    if (!this.entityManager) return;
    const projectiles = this.entityManager.getEntitiesByTag("projectile");
    // const enemies = this.entityManager.getEntitiesByTag("enemy");

    for (let i = 0; i < projectiles.length; i++) {
      const projectile = projectiles[i];

      const position = projectile.getComponent("PositionComponent");
      const velocity = projectile.getComponent("VelocityComponent");
      const size = projectile.getComponent("ColliderComponent");

      if (!position || !velocity || !size) return;

      position.x -= velocity.vx * deltaTime;
    }

    if (!projectiles[0]) return;

    console.log("ProjectileCollisionSystem");
  }
}
