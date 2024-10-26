import { System } from "../core/System";

export class ProjectileCollisionSystem extends System {
  constructor() {
    super();
  }

  update(deltaTime: number) {
    if (!this.entityManager) return;
    const projectiles = this.entityManager.getEntitiesByTag("projectile");
    const enemies = this.entityManager.getEntitiesByTag("enemy");

    if (!projectiles[0] || !enemies[0]) return;
    console.log("ProjectileCollisionSystem");
  }
}
