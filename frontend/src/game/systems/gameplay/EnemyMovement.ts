import { System } from "../../../engine/core";
import { PositionComponent, VelocityComponent } from "../../components";

export class EnemyMovement extends System {
  constructor() {
    super();
  }

  update(deltaTime: number): void {
    const enemies = this.scene.entityManager.getEntitiesWithComponents([
      "FollowPlayerComponent",
    ]);
    const player = this.scene.entityManager.getEntityByTag("player");

    if (!enemies || !player) return;

    // get player position
    // loop through enemies and move each enemy towards player pos

    const playerPos =
      player.getComponent<PositionComponent>("PositionComponent");
    for (const enemy of enemies) {
      const enemyPos =
        enemy.getComponent<PositionComponent>("PositionComponent");
      const enemyVel =
        enemy.getComponent<VelocityComponent>("VelocityComponent");

      if (!enemyPos || !enemyVel || !playerPos) return;

      enemyPos.pos.x -= playerPos.pos.x * deltaTime;
      enemyPos.pos.y -= playerPos.pos.y * deltaTime;
    }
  }
}
