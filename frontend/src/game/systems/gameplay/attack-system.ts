import { System } from "../../core/System";
import {
  ColliderComponent,
  InventoryComponent,
  PositionComponent,
  SpriteOffsetComponent,
  TagComponent,
  VelocityComponent,
  WeaponComponent,
} from "../../components";
import { Entity } from "../../core";
import { DirectionComponent } from "../../components/physics/DirectionComponent";
import { LifeTimeComponent } from "../../components/gameplay/LifeTimeComponent";
import { DamageComponent } from "../../components/gameplay/DamageComponent";
import { AnimationComponent } from "../../components/rendering/Animation";
import { HitTrackingComponent } from "../../components/gameplay/HitTrackingComponent";

export class PlayerAttackSystem extends System {
  constructor() {
    super();
  }

  // THIS SYSTEM SHOULD ONLY TAKE CARE OF LOOPING THROUGH WEAPONS AND SPAWNING PROJECTILES

  update(deltaTime: number) {
    const player = this.scene.entityManager.getEntitiesByTag("player")[0];
    const inventory = player.getComponent(
      "InventoryComponent"
    ) as InventoryComponent;

    if (inventory && inventory.weapons.length > 0) {
      for (const weapon of inventory.weapons) {
        if (weapon.config.cooldown > 0) {
          weapon.config.cooldown -= deltaTime;
          continue;
        } else {
          this.attack(weapon, player);
          weapon.config.cooldown = weapon.config.interval;
        }
      }
    }
  }

  attack(weapon: WeaponComponent, player: Entity) {
    if (!this.scene) return;

    switch (weapon.config.type) {
      case "melee":
        this.meleeAttack(weapon, player);
        break;
      case "ranged":
        this.projectileAttack(weapon, player);
        break;
      default:
        break;
    }
  }

  meleeAttack(weapon: WeaponComponent, player: Entity) {
    const position = player.getComponent(
      "PositionComponent"
    ) as PositionComponent;

    const direction = player.getComponent(
      "DirectionComponent"
    ) as DirectionComponent;

    if (!position || !direction) return;

    const offset = direction.direction === "left" ? -32 : 16;

    const meleeAttack = this.scene.entityManager.createEntity();
    meleeAttack
      .addComponent(
        new PositionComponent({
          x: position.x + offset,
          y: position.y,
        })
      )
      .addComponent(new ColliderComponent(weapon.config.collider))
      .addComponent(weapon.sprite.img)
      .addComponent(new VelocityComponent(weapon.config.velocity))
      .addComponent(new LifeTimeComponent({ time: weapon.config.lifeTime }))
      .addComponent(new DamageComponent({ value: weapon.config.damage }))
      .addComponent(new HitTrackingComponent())
      .addComponent(new DirectionComponent({ direction: direction.direction }))
      .addComponent(new TagComponent({ tag: "melee" }));

    if (weapon.sprite.animation) {
      meleeAttack.addComponent(
        new AnimationComponent({
          animations: weapon.sprite.animation.animations,
          frameRate: weapon.sprite.animation.frameRate,
          currentAnimation: weapon.sprite.animation.currAnimation,
        })
      );
    }
  }

  projectileAttack(weapon: WeaponComponent, player: Entity) {
    const position = player.getComponent(
      "PositionComponent"
    ) as PositionComponent;

    const direction = player.getComponent(
      "DirectionComponent"
    ) as DirectionComponent;

    if (!position || !direction) return;

    const offsetY = 8;
    const offsetX = direction.direction === "left" ? 0 : 8;

    this.scene.entityManager
      .createEntity()
      .addComponent(
        new PositionComponent({
          x: position.x + offsetX,
          y: position.y + offsetY,
        })
      )
      .addComponent(new ColliderComponent(weapon.config.collider))
      .addComponent(weapon.sprite.img)
      .addComponent(new SpriteOffsetComponent(weapon.sprite.offset))
      .addComponent(new VelocityComponent(weapon.config.velocity))
      .addComponent(new LifeTimeComponent({ time: weapon.config.lifeTime }))
      .addComponent(new DamageComponent({ value: weapon.config.damage }))
      .addComponent(new DirectionComponent({ direction: direction.direction }))
      .addComponent(new TagComponent({ tag: "projectile" }));
  }
}
