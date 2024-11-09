/**
 * Collision system
 * Handles collisions between collidable entities
 *
 * Merge my current setup to this one system
 *
 * get the player and every entity that has collider component
 * check if the player is colliding with the entity
 *
 * if so, call the onCollision function
 * in the onCollision function determine what type of entity it is
 *
 * if it is an enemy, call the onEnemyCollision function
 * if it is a wall call the onWallCollision function
 *
 *  MAYBE BETTER VERSION
 *
 *  get all the collidable entities
 *  loop through them
 *  check if any of them are colliding
 *  if so, call the onCollision function
 *  onCollision function will push the entities away from each other so they dont overlap
 *  check if entity has knockback component
 *  if so, apply the knockback to the entity it is colliding with (if wall then ignore)
 *
 * Maybe add metadab to collider compoent - knockback, damage, etc
 */

import { ColliderComponent } from "../../components";
import { Entity, System } from "../../core";

export class CollisionSystem extends System {
  constructor() {
    super();
  }

  update() {
    const collidableEntities =
      this.scene.entityManager.getEntitiesWithComponents([
        "ColliderComponent",
        "PositionComponent",
      ]);

    // Nested loops to check each pair of collidable entities
    for (let i = 0; i < collidableEntities.length; i++) {
      for (let j = i + 1; j < collidableEntities.length; j++) {
        const entityA = collidableEntities[i];
        const entityB = collidableEntities[j];

        const colliderA = entityA.getComponent("ColliderComponent");
        const colliderB = entityB.getComponent("ColliderComponent");

        if (this.checkCollision(colliderA, colliderB)) {
          this.handleCollision(entityA, entityB);
        }
      }
    }
  }

  handleCollision(entityA: Entity, entityB: Entity) {
    if (
      entityA.hasComponent("ProjectileComponent") &&
      entityB.hasComponent("EnemyComponent")
    ) {
      this.applyProjectileEnemyCollision(entityA, entityB);
    } else if (
      entityA.hasComponent("ProjectileComponent") &&
      entityB.hasComponent("WallComponent")
    ) {
      this.applyProjectileWallCollision(entityA);
    } else if (
      entityA.hasComponent("EnemyComponent") &&
      entityB.hasComponent("WallComponent")
    ) {
      this.applyEnemyWallCollision(entityA);
    }
  }

  applyProjectileEnemyCollision(projectile: Entity, enemy: Entity) {
    const damage = projectile.getComponent("DamageComponent").value;
    enemy.getComponent("HealthComponent").reduce(damage);
    this.scene.entityManager.removeEntityById(projectile.id); // Destroy projectile on impact
  }

  applyProjectileWallCollision(projectile: Entity) {
    this.scene.entityManager.removeEntityById(projectile.id); // Destroy projectile on wall impact
  }

  applyEnemyWallCollision(enemy: Entity) {
    // Logic to prevent enemy from moving through the wall
  }

  checkCollision(entity1: Entity, entity2: Entity): boolean {
    const pos1 = entity1.getComponent("PositionComponent");
    const pos2 = entity2.getComponent("PositionComponent");
    const col1 = entity1.getComponent("ColliderComponent");
    const col2 = entity2.getComponent("ColliderComponent");

    return (
      pos1.x < pos2.x + col2.width &&
      pos1.x + col1.width > pos2.x &&
      pos1.y < pos2.y + col2.height &&
      pos1.y + col1.height > pos2.y
    );
  }
}
