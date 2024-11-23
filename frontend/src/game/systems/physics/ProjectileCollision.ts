import { System } from "../../../engine/core";

export class ProjectileCollisionSystem extends System {
  constructor() {
    super();
  }

  update(deltaTime: number) {
    const projectiles = this.scene.entityManager.getEntitiesByTag("projectile");
    const enemies = this.scene.entityManager.getEntitiesByTag("enemy");

    if (!projectiles.length || !enemies.length) {
      return;
    }
  }
}
