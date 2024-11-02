import { Entity, System } from "../../core";

export class ProjectileCollisionSystem extends System {
  constructor() {
    super();
  }

  update(deltaTime: number) {
    if (!this.entityManager) return;
    const projectiles = this.entityManager.getEntitiesByTag("projectile");
    const enemies = this.entityManager.getEntitiesByTag("enemy");

    if (!projectiles.length || !enemies.length) {
      return;
    }
  }
}
