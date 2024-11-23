import { PlayerAnimations } from "../../animations/player";
import {
  ColliderComponent,
  DirectionComponent,
  HealthComponent,
  PositionComponent,
  TagComponent,
  VelocityComponent,
} from "../../components";
import { DamageComponent } from "../../components/DamageComponent";
import { HitTrackingComponent } from "../../components/HitTrackingComponent";
import { LifeTimeComponent } from "../../components/LifeTimeComponent";
import { AccelerationComponent } from "../../components/Acceleration";
import { AnimationComponent } from "../../components/Animation";
import { Entity, System } from "../../../engine/core";

export class ProjectileSystem extends System {
  entitiesToDelete: number[] = [];
  constructor() {
    super();
    this.entitiesToDelete = [];
  }

  // THIS SYSTEM SHOULD TAKE PROJECTILES SPAWNED BY ATTACK SYSTEM AND MOVE THEM, CHECK THEIR LIFETIME, CHECK IF THEY COLLIDE
  // I SHOULD HAVE SOMEWHERE HERE A SWITCH STATEMENT THAT DETERMINES WHAT TYPE OF PROJECTILE IT IS
  // DOES IT BOUNCE? DOES IT PASS THROUGH? DOES IT DISAPPEAR?

  update(deltaTime: number) {
    const projectiles = this.scene.entityManager.getEntitiesWithComponents([
      "DamageComponent",
      "LifeTimeComponent",
    ]);
    const enemies = this.scene.entityManager.getEntitiesByTag("enemy");

    projectiles.forEach((projectile) => {
      const position =
        projectile.getComponent<PositionComponent>("PositionComponent");
      const collider =
        projectile.getComponent<ColliderComponent>("ColliderComponent");
      const velocity =
        projectile.getComponent<VelocityComponent>("VelocityComponent");
      const acceleration = projectile.getComponent<AccelerationComponent>(
        "AccelerationComponent"
      );
      const lifetime =
        projectile.getComponent<LifeTimeComponent>("LifeTimeComponent");
      const direction =
        projectile.getComponent<DirectionComponent>("DirectionComponent");
      const animation =
        projectile.getComponent<AnimationComponent<any>>("AnimationComponent");

      if (
        !position ||
        !velocity ||
        !lifetime ||
        !direction ||
        !collider ||
        !acceleration
      )
        return;

      // sub the playe / enemy vectors
      // normalize them
      // set the fireballs velocity (this moves it)

      switch (direction.direction) {
        case "left":
          position.pos.x -= velocity.vel.x * deltaTime;
          break;
        case "right":
          position.pos.x += velocity.vel.x * deltaTime;
          break;
        case "up":
          position.pos.y -= velocity.vel.y * deltaTime;
          break;
        case "down":
          position.pos.y += velocity.vel.y * deltaTime;
          break;
      }

      for (const enemy of enemies) {
        const enCol =
          enemy.getComponent<ColliderComponent>("ColliderComponent");
        const enPos =
          enemy.getComponent<PositionComponent>("PositionComponent");

        if (!enCol || !enPos) return;

        if (this.isColliding(position, collider, enCol, enPos)) {
          this.resolveCollision(projectile, enemy);
        }
      }

      lifetime.time -= deltaTime;
      if (lifetime.time <= 0) {
        // If there is animation runnin wait for it to complete then delete else delete immediately
        if (animation) {
          if (animation.isCompleted) {
            this.entitiesToDelete.push(projectile.id);
          }
          return;
        } else {
          this.entitiesToDelete.push(projectile.id);
        }
      }
    });
  }

  cleanUp(): void {
    for (let i = 0; i < this.entitiesToDelete.length; i++) {
      this.scene.entityManager.removeEntityById(this.entitiesToDelete[i]);
      this.entitiesToDelete.splice(i, 1);
    }
  }

  isColliding(
    position: PositionComponent,
    collider: ColliderComponent,
    enCol: ColliderComponent,
    enPos: PositionComponent
  ) {
    return (
      position.pos.x < enPos.pos.x + enCol.w &&
      position.pos.x + collider.w > enPos.pos.x &&
      position.pos.y < enPos.pos.y + enCol.h &&
      position.pos.y + collider.h > enPos.pos.y
    );
  }

  resolveCollision(projectile: Entity, enemy: Entity) {
    const damage = projectile.getComponent<DamageComponent>("DamageComponent");
    const hitTracking = projectile.getComponent<HitTrackingComponent>(
      "HitTrackingComponent"
    );

    const health = enemy.getComponent<HealthComponent>("HealthComponent");
    const animation =
      enemy.getComponent<AnimationComponent<PlayerAnimations>>(
        "AnimationComponent"
      );

    if (!damage || !health) return;

    if (hitTracking) {
      if (hitTracking.hasHit(enemy.id)) return;
      hitTracking.addHit(enemy.id);
    }

    health.health -= damage.value;
    if (animation && animation.currentAnimation !== "damage") {
      animation.Frame = "damage";
    }

    if (
      projectile.getComponent<TagComponent>("TagComponent")?.tag ===
      "projectile"
    ) {
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
